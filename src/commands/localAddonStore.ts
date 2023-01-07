import { useLocalAddonsStore } from "@/stores/localAddons.store";

type Message = {
  data: {
    property: string;
    value: unknown;
  };
};

/** Set a value in the `localAddonStore` state */
export default (message: Message) => {
  const localAddonStore = useLocalAddonsStore();

  const { property, value } = message.data;

  //@ts-ignore
  localAddonStore[property] = value;
};
