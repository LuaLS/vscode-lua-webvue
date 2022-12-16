import { defineStore } from "pinia";

export type AuthStore = {
  access_token: string | null;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => {
    return {
      access_token: null,
    };
  },
  actions: {},
});
