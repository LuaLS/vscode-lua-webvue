import { defineStore } from "pinia";
import { getGitTree } from "@/services/github.service";
import { ADDONS_DIRECTORY } from "@/config";
import { RemoteAddon } from "@/services/addon.service";

export type AddonStore = {
  loading: boolean;
  addons: RemoteAddon[];
  addonsTruncated: boolean;
  error: string | null;
};

export const useAddonStore = defineStore("addons", {
  state: (): AddonStore => ({
    loading: true,
    addons: [],
    addonsTruncated: false,
    error: null,
  }),
  getters: {
    sortedByName(state): RemoteAddon[] {
      return [...state.addons].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  actions: {
    async getList() {
      this.loading = true;
      this.addons = [];

      let addonFolderSHA: string;

      // Get SHA of addons folder
      try {
        const data = await getGitTree("main");
        const addonFolder = data.tree.find(
          (node) => node.path === ADDONS_DIRECTORY
        );
        if (!addonFolder) {
          console.error(`Could not find "${ADDONS_DIRECTORY}" folder`);
          return;
        }
        addonFolderSHA = addonFolder.sha;
      } catch (e) {
        console.error(e);
        return;
      }

      // Get addons
      try {
        const tree = await getGitTree(addonFolderSHA);
        if (tree.truncated) {
          this.addonsTruncated = true;
          console.warn("Addons folder has been truncated!");
        }

        for (const node of tree.tree) {
          const addon = new RemoteAddon(node.path, node.url);

          Promise.all([
            addon.getConfig(),
            addon.getTree().then(() => {
              addon.calculateSize();
            }),
            addon.getLatestHash(),
          ]).then(() => this.addons.push(addon));
        }
      } catch (e) {
        console.error(e);
        return;
      }

      this.loading = false;
    },
    getAddon(name: string): RemoteAddon | undefined {
      return this.addons.find((addon) => addon.name === name);
    },
  },
});
