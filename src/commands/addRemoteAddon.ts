import { useRemoteAddonStore } from "@/stores/remoteAddons";
import type { RemoteAddon } from "@/types/addon";

type Message = {
  data: {
    addons: RemoteAddon | RemoteAddon[];
  };
};

export default (message: Message) => {
  const addonStore = useRemoteAddonStore();

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
