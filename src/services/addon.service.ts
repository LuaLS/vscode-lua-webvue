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
      const response = (await downloadFile(configFileRawURL)) as AddonConfig;
      return response;
    } catch (e) {
      throw new Error(
        `Could not download config file for "${this.name}" addon`
      );
    }
  }

  /** Calculate the size of an addon */
  async calculateSize() {
    let size = 0;

    try {
      const response = await getGitTree(this.url, true);

      for (const node of response.tree) {
        if (node.size) {
          size += node.size;
        }
      }
    } catch (e) {
      throw new Error(`Failed to get size of addon! (${e})`);
    }

    return size;
  }
}
