import { useRemoteAddonStore } from "@/stores/remoteAddons";
import type { RemoteAddon } from "@/types/addon";

export default (data: { data: RemoteAddon }) => {
  const addonStore = useRemoteAddonStore();

  const index = addonStore.addons.findIndex(
    (addon) => addon.name === data.data.name
  );

  if (index > -1) {
    Object.assign(addonStore.addons[index], data.data);
  } else {
    addonStore.$patch((state) => {
      state.addons.push(data.data);
    });
  }

  addonStore.loading = false;
};
