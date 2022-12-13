import { defineStore } from "pinia";

type authStore = {
  access_token: string | null;
};

export const useAuthStore = defineStore("auth", {
  state: (): authStore => {
    return {
      access_token: null,
    };
  },
  actions: {},
});
