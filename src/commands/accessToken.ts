import { useAuthStore } from "@/stores/auth";

export default (data: { data: string }) => {
  const authStore = useAuthStore();
  authStore.access_token = data.data;
};
