import type { TreeNode } from "@/types/github";
import type { AddonConfig, LocalAddonFromVSCode } from "@/types/addon";

import { vscode } from "@/services/vscode.service";
import { ADDONS_DIRECTORY } from "@/config";
import { downloadFile, getGitTree, getCommit } from "./github.service";
import dayjs from "dayjs";

/** General structure of an Addon */
export class Addon {
  /** Name of the addon */
  name: string;

  /** Display name of the addon from `config.json` */
  displayName?: string;

  /** If there is data loading for this addon */
  loading?: boolean;

  /** A description of the addon */
  description?: string;

  /** Size of the addon in bytes */
  size?: number;

  /** Config of the addon */
  config?: AddonConfig;

  /** The addon file tree */
  tree?: TreeNode[];

  /** Whether the tree was too large and was truncated */
  treeTruncated?: boolean;

  constructor(name: string) {
    this.name = name;
  }
}

/** An addon that lives in the GitHub repo */
export class RemoteAddon extends Addon {
  /** Github API url for the addon */
  readonly url: string;

  /** ISO timestamp (milliseconds) of when the addon was last committed to */
  commitDate?: dayjs.Dayjs;

  constructor(name: string, url: string) {
    super(name);
    this.url = url;
    this.loading = true;
  }

  public static loadFromState(addon: RemoteAddon) {
    const obj = new RemoteAddon(addon.name, addon.url);

    // Add fields back in
    for (const key in addon) {
      //@ts-ignore
      obj[key] = addon[key];
    }

    obj.commitDate = dayjs(addon.commitDate);

    return obj;
  }

  /** Get the configuration file for this addon from GitHub */
  public async getConfig(): Promise<void> {
    try {
      const configFilePath = `${ADDONS_DIRECTORY}/${this.name}/config.json`;
      const config = await downloadFile<AddonConfig>(configFilePath);
      this.config = config;
      this.description = config.description;
      this.displayName = config.name;
    } catch (e) {
      console.error(`Failed to get config file for "${this.name}" addon!`);
      throw e;
    }
  }

  /** Get the Git tree for this addon from GitHub */
  public async getTree(): Promise<void> {
    try {
      const response = await getGitTree(this.url, true);
      this.tree = response.tree;
      this.treeTruncated = response.truncated;
      this.size = this.tree.reduce((sum, node) => (sum += node.size ?? 0), 0);
    } catch (e) {
      console.error(`Failed to get git tree for "${this.name}" addon! (${e})`);
      throw e;
    }
  }

  /** Get the date that this addon was last modified from GitHub */
  public async getModifiedDate(): Promise<void> {
    try {
      const commit = await getCommit(`${ADDONS_DIRECTORY}/${this.name}`);
      this.commitDate = dayjs(commit.commit.committer.date);
    } catch (e) {
      console.error(`Failed to get modified date for "${this.name}" addon!`);
      throw e;
    }
  }

  /** Send message to VS Code to download this addon */
  public download() {
    if (!this.tree)
      throw new Error(
        `Cannot download "${this.name}", tree has not be retrieved!`
      );

    if (!this.commitDate)
      throw new Error(
        `Cannot download "${this.name}", commit date is undefined`
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
        commitDate: dayjs().valueOf(),
      })
    );
  }
}

export class LocalAddon extends Addon {
  enabled: boolean;

  installDate: dayjs.Dayjs;

  hasPlugin: boolean;

  constructor(addon: LocalAddonFromVSCode | LocalAddon) {
    super(addon.name);
    this.enabled = addon.enabled;
    this.description = addon.description;
    this.size = addon.size;
    this.installDate = dayjs(addon.installDate);
    this.hasPlugin = addon.hasPlugin;
    this.displayName = addon.displayName;
  }

  public static loadFromState(addon: LocalAddon) {
    return new LocalAddon(addon);
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

  public enable() {
    vscode.postMessage(
      JSON.stringify({
        command: "enable",
        name: this.name,
      })
    );
  }

  public disable() {
    vscode.postMessage(
      JSON.stringify({
        command: "disable",
        name: this.name,
      })
    );
  }

  public open() {
    vscode.postMessage(
      JSON.stringify({
        command: "open",
        name: this.name,
      })
    );
  }
}
