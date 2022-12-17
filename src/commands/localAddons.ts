import type { LocalAddonFromVSCode } from "@/types/addon";

import { LocalAddon } from "@/services/addon.service";
import { useInstalledAddonStore } from "@/stores/installedAddons";

export default (data: {
  addons: LocalAddonFromVSCode[];
  totalSize: number;
}) => {
  const addonStore = useInstalledAddonStore();

  addonStore.addons = data.addons.map((addon) => new LocalAddon(addon));
  addonStore.totalSize = data.totalSize;
  addonStore.loading = false;
};
