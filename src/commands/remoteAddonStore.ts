import { useRemoteAddonStore } from "@/stores/remoteAddons";

type Message = {
  data: {
    property: string;
    value: any;
  };
};

export default (message: Message) => {
  const remoteAddonStore = useRemoteAddonStore();

  const { property, value } = message.data;

  //@ts-ignore
  remoteAddonStore[property] = value;
};
