import { defineStore } from "pinia";
import type { LocalAddon } from "@/services/addon.service";
import { vscode } from "@/services/vscode.service";

export type InstalledAddonStore = {
  loading: boolean;
  addons: LocalAddon[];
  totalSize: number | null;
  error: string | null;
};

export const useInstalledAddonStore = defineStore("installedAddons", {
  state: (): InstalledAddonStore => ({
    loading: true,
    addons: [],
    totalSize: null,
    error: null,
  }),
  getters: {
    sortedByName(state): LocalAddon[] {
      return [...state.addons].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  actions: {
    getList() {
      this.loading = true;
      vscode.postMessage(
        JSON.stringify({
          command: "getInstalled",
        })
      );
    },
    getAddon(name: string) {
      return this.addons.find((addon) => addon.name === name);
    },
  },
});
