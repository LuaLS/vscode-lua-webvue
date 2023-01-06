import { useLocalAddonsStore } from "@/stores/localAddons.store";

type Message = {
  data: {
    property: string;
    value: any;
  };
};

export default (message: Message) => {
  const localAddonStore = useLocalAddonsStore();

  const { property, value } = message.data;

  //@ts-ignore
  localAddonStore[property] = value;
};
