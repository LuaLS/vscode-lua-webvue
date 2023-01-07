import { useRemoteAddonStore } from "@/stores/remoteAddons";

type Message = {
  data: {
    property: string;
    value: unknown;
  };
};

/** Set a value in the `remoteAddonStore` state */
export default (message: Message) => {
  const remoteAddonStore = useRemoteAddonStore();

  const { property, value } = message.data;

  //@ts-ignore
  remoteAddonStore[property] = value;
};
