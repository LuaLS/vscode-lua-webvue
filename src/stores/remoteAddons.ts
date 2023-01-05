import { defineStore } from "pinia";
import type { RemoteAddon } from "@/types/addon";
import { vscode } from "@/services/vscode.service";

export type RemoteAddonStore = {
  loading: boolean;
  page: number;
  addons: RemoteAddon[];
  total: number | null;
  error: string | null;
};

export const useRemoteAddonStore = defineStore("remoteAddons", {
  state: (): RemoteAddonStore => ({
    loading: true,
    page: 1,
    addons: [],
    total: null,
    error: null,
  }),
  getters: {
    sortedByName(state): RemoteAddon[] {
      return [...state.addons].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  actions: {
    async getPage(page?: number) {
      if (page) this.page = page;

      vscode.postMessage("getRemoteAddonPage", { page: this.page });
      this.page++;
    },
    getAddon(name: string): RemoteAddon | undefined {
      return this.addons.find((addon) => addon.name === name);
    },
  },
});
