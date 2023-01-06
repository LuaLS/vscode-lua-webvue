import { useRemoteAddonStore } from "@/stores/remoteAddons";

type Message = {
  data: {
    property: "loading";
    value: boolean;
  };
};

/** Set a value in the `remoteAddonStore` state */
export default (message: Message) => {
  const remoteAddonStore = useRemoteAddonStore();

  const { property, value } = message.data;

  remoteAddonStore[property] = value;
};
