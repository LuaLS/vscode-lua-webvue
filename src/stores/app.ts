import { defineStore } from "pinia";

export type AppStore = {
  workspaceOpen: boolean;
  clientVersion: string;
};

export const useAppStore = defineStore("app", {
  state: (): AppStore => ({
    workspaceOpen: false,
    clientVersion: "",
  }),
});
