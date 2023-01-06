import type { LocalAddon } from "@/types/addon";
import { useLocalAddonsStore } from "@/stores/localAddons.store";

type Message = {
  data: {
    addons: LocalAddon | LocalAddon[];
  };
};

export default (message: Message) => {
  const addonStore = useLocalAddonsStore();

  const addons = Array.isArray(message.data.addons)
    ? message.data.addons
    : [message.data.addons];

  addonStore.$patch((state) => {
    for (const newAddon of addons) {
      const index = state.addons.findIndex(
        (addon) => addon.name === newAddon.name
      );

      if (index > -1) {
        Object.assign(state.addons[index], newAddon);
      } else {
        state.addons.push(newAddon);
      }
    }
  });
};
