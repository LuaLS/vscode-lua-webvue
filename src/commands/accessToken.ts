import { useAuthStore } from "@/stores/auth";

export const accessToken = (data: any) => {
  const authStore = useAuthStore();
  authStore.access_token = data.data;
};
