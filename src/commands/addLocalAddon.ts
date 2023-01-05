import type { LocalAddon } from "@/types/addon";
import { useLocalAddonsStore } from "@/stores/localAddons.store";

export default (data: { data: LocalAddon }) => {
  const addonStore = useLocalAddonsStore();

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
