import { useRemoteAddonStore } from "@/stores/remoteAddons";

type Message = {
  data: {
    prop: string;
    value: any;
  };
};

export default (message: Message) => {
  const remoteAddonStore = useRemoteAddonStore();

  const { prop, value } = message.data;

  //@ts-ignore
  remoteAddonStore[prop] = value;
};
