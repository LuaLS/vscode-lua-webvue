import { defineStore } from "pinia";
import { vscode } from "@/services/vscode.service";
import type { LocalAddon } from "@/types/addon";

export type LocalAddonsStore = {
  loading: boolean;
  addons: LocalAddon[];
  page: number;
  total: number | null;
  error: string | null;
};

export const useLocalAddonsStore = defineStore("localAddons", {
  state: (): LocalAddonsStore => ({
    loading: true,
    addons: [],
    page: 1,
    total: null,
    error: null,
  }),
  getters: {
    sortedByName(state): LocalAddon[] {
      return [...state.addons].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  actions: {
    getPage() {
      vscode.postMessage("getLocalAddonsPage", {
        page: this.page,
      });
      this.page++;
    },
    refresh() {
      this.page = 1;
      vscode.postMessage("refreshLocalAddons");
      this.getPage();
    },
    getAddon(name: string) {
      return this.addons.find((addon) => addon.name === name);
    },
  },
});
