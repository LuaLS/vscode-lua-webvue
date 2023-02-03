import { defineStore } from "pinia";
import { vscode } from "@/services/vscode.service";
import type { Addon } from "@/types/addon";

export type AddonStore = {
  loading: boolean;
  addons: Addon[];
  page: number;
  total: number | null;
  error: string | null;
};

export const useAddonStore = defineStore("addons", {
  state: (): AddonStore => ({
    loading: true,
    addons: [],
    page: 1,
    total: null,
    error: null,
  }),
  getters: {
    sortedByName(state): Addon[] {
      return [...state.addons].sort((a, b) => {
        if (a.hasUpdate) return -1;
        return a.name.localeCompare(b.name);
      });
    },
  },
  actions: {
    getPage() {
      vscode.postMessage("getAddonsPage", {
        page: this.page,
      });
      this.page++;
    },
    refresh() {
      this.page = 1;
      vscode.postMessage("refreshAddons");
      this.getPage();
    },
    getAddon(name: string) {
      return this.addons.find((addon) => addon.name === name);
    },
  },
});