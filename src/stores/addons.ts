import { defineStore } from "pinia";
import { getGitTree } from "@/services/github.service";
import { ADDONS_DIRECTORY } from "@/config";
import { Addon } from "@/services/addon.service";

type AddonState = {
  loading: boolean;
  addons: Addon[];
  addonsTruncated: boolean;
  error: string | null;
};

export const useAddonStore = defineStore("addons", {
  state: (): AddonState => ({
    loading: true,
    addons: [],
    addonsTruncated: false,
    error: null,
  }),
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
          const addon = new Addon(node.path, node.url);

          Promise.all([
            addon.fetchConfigFile(),
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
  },
});
