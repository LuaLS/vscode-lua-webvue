import { useLocalAddonsStore } from "@/stores/localAddons.store";

type Message = {
  data: {
    property: "loading";
    value: boolean;
  };
};

/** Set a value in the `localAddonStore` state */
export default (message: Message) => {
  const localAddonStore = useLocalAddonsStore();

  const { property, value } = message.data;

  localAddonStore[property] = value;
};
