import { defineStore } from "pinia";

export type AppStore = {
  workspaceOpen: boolean;
};

export const useAppStore = defineStore("app", {
  state: (): AppStore => {
    return {
      workspaceOpen: false,
    };
  },
  actions: {},
});
