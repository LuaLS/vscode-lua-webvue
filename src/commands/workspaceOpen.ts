import { useAppStore } from "@/stores/app";

export default (data: { data: boolean }) => {
  const appStore = useAppStore();
  appStore.workspaceOpen = data.data;
};
