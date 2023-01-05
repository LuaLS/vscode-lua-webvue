import { useAppStore } from "@/stores/app";

export default (message: { data: boolean }) => {
  const appStore = useAppStore();

  console.log(message.data);

  appStore.workspaceOpen = message.data;
};
