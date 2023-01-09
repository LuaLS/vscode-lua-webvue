import { useAppStore } from "@/stores/app";

type Message = {
  data: {
    property: string;
    value: unknown;
  };
};
export default (message: Message) => {
  const appStore = useAppStore();

  const property = message.data.property;
  const value = message.data.value;

  switch (property) {
    case "workspaceState":
      appStore.workspaceOpen = value as boolean;
      break;
    case "clientVersion":
      appStore.clientVersion = value as string;
      break;
    default:
      console.warn(`Unsupported appStore property "${property}"`);
      break;
  }
};
