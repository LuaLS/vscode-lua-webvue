import { useAppStore } from "@/stores/app";

export default (message: { data: boolean }) => {
  const appStore = useAppStore();

  appStore.workspaceOpen = message.data;
};
