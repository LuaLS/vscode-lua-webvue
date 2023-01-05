import { useLocalAddonsStore } from "@/stores/localAddons.store";

type Message = {
  data: {
    prop: string;
    value: any;
  };
};

export default (message: Message) => {
  const localAddonStore = useLocalAddonsStore();

  const { prop, value } = message.data;

  //@ts-ignore
  localAddonStore[prop] = value;
};
