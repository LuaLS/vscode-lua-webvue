import axios from "axios";
import { vscode } from "@/services/vscode.service";
import { ADDONS_DIRECTORY } from "@/config";

import type { TreeNode, TreeResponse } from "@/types/github";
import { downloadFile, getGitTree, getCommit } from "./github.service";

export type AddonConfig = {
  name: string;
  description: string;
  settings: { [index: string]: Object };
};

export class Addon {
  /** Name of the addon */
  public name: string;

  /** If there is data loading for this addon */
  public loading?: boolean;

  /** A description of the addon */
  public description?: string;

  /** Size of the addon in bytes */
  public size?: number;

  /** Config of the addon */
  public config?: AddonConfig;

  /** The addon file tree */
  public tree?: TreeNode[];

  /** Whether the tree was too large and was truncated */
  public treeTruncated?: boolean;

  /** Latest git commit hash */
  public hash?: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class RemoteAddon extends Addon {
  /** Github API url for the addon */
  readonly url: string;

  constructor(name: string, url: string) {
    super(name);
    this.url = url;
    this.loading = true;
  }

  async getConfig() {
    let configFileNode: TreeNode;

    try {
      const response = await axios.get<TreeResponse>(this.url);
      const node = response.data.tree.find(
        (node) => node.path === "config.json"
      );
      if (!node) {
        throw new Error(`Could not find config file for "${this.name}" addon`);
      }
      configFileNode = node;
    } catch (e) {
      throw new Error(`Could not get Git tree for "${this.name}" addon`);
    }

    try {
      const configFileRawURL = `${ADDONS_DIRECTORY}/${this.name}/${configFileNode.path}`;
      const response = await downloadFile<AddonConfig>(configFileRawURL);
      if (!response) return;

      this.config = response;
      this.description = response.description;
    } catch (e) {
      throw new Error(
        `Could not download config file for "${this.name}" addon`
      );
    }
  }

  /** Get the Git tree for this addon */
  async getTree() {
    try {
      const response = await getGitTree(this.url, true);
      this.tree = response.tree;
      this.treeTruncated = response.truncated;
    } catch (e) {
      throw new Error(`Failed to get git tree for addon! (${e})`);
    }
  }

  /** Calculate the size of an addon */
  calculateSize() {
    if (!this.tree)
      throw new Error(
        `Could not get size of addon, git tree has not been retrieved!`
      );

    this.size = this.tree.reduce((sum, node) => (sum += node.size ?? 0), 0);
  }

  /** Get the latest commit hash for this addon */
  async getLatestHash() {
    const commit = await getCommit(`${ADDONS_DIRECTORY}/${this.name}`);

    if (!commit) {
      console.error("Could not get latest hash!");
      return;
    }

    this.hash = commit.sha;
  }

  /** Send message to VS Code to download this addon */
  download() {
    if (!this.tree)
      throw new Error(
        `Cannot download ${this.name}, tree has not be retrieved!`
      );

    if (!this.hash)
      throw new Error(
        `Cannot download ${this.name} as the latest commit has not been retrieved`
      );

    // Get just the data that is needed from the tree
    const tree = this.tree.map((node) => {
      return { path: node.path, type: node.type };
    });

    vscode.postMessage(
      JSON.stringify({
        command: "download",
        name: this.name,
        tree,
        hash: this.hash,
      })
    );
  }
}

// TODO: put this somewhere logical
type LocalAddonAsReceived = {
  name: string;
  description: string;
  size: number;
  hash?: string;
};

export class LocalAddon extends Addon {
  constructor(addon: LocalAddonAsReceived) {
    super(addon.name);
    this.description = addon.description;
    this.size = addon.size;
    this.hash = addon.hash;
  }

  /** Ask VS Code to uninstall this addon */
  public uninstall() {
    vscode.postMessage(
      JSON.stringify({
        command: "uninstall",
        name: this.name,
      })
    );
  }
}
