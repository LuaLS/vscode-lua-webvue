import axios from "axios";
import { ADDONS_DIRECTORY } from "@/config";

import type { TreeNode, TreeResponse } from "@/types/github";
import { downloadFile, getGitTree } from "./github.service";

export type AddonConfig = {
  name: string;
  description: string;
  settings: { [index: string]: Object };
};

export class Addon {
  /** The path of the addon in the remote repository */
  readonly path: string;
  readonly url: string;
  public name: string;
  public description?: string;
  public tree?: TreeNode[];
  public treeTruncated?: boolean;
  public config?: AddonConfig;
  /** Size of the addon in bytes */
  public size?: number;

  constructor(path: string, url: string) {
    this.path = path;
    this.name = path.split("/").slice(-1)[0];
    this.url = url;
  }

  async fetchConfigFile() {
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
}
