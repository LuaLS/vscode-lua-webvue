import { LocalAddon } from "@/services/addon.service";
import { useInstalledAddonStore } from "@/stores/installedAddons";

type Addon = {
  name: string;
  description: string;
  size: number;
  latestHash: string;
};

export default (data: { addons: Addon[]; totalSize: number }) => {
  const addonStore = useInstalledAddonStore();

  addonStore.addons = data.addons.map((addon) => new LocalAddon(addon));
  addonStore.totalSize = data.totalSize;
  addonStore.loading = false;
};
