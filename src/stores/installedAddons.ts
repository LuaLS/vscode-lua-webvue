import { defineStore } from "pinia";
import type { LocalAddon } from "@/services/addon.service";
import { vscode } from "@/services/vscode.service";

type InstalledAddonState = {
  loading: boolean;
  addons: LocalAddon[];
  totalSize: number | null;
  error: string | null;
};

export const useInstalledAddonStore = defineStore("installedAddons", {
  state: (): InstalledAddonState => ({
    loading: true,
    addons: [],
    totalSize: null,
    error: null,
  }),
  actions: {
    getList() {
      vscode.postMessage(
        JSON.stringify({
          command: "getInstalled",
        })
      );
    },
  },
});
