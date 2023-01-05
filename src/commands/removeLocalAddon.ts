import { useLocalAddonsStore } from "@/stores/localAddons.store";

export default (message: { data: { name: string } }) => {
  const addonStore = useLocalAddonsStore();

  const index = addonStore.addons.findIndex((addon) => {
    console.log(addon.name, message.data.name);
    return addon.name === message.data.name;
  });

  if (index < 0) {
    console.warn(`Could not find "${message.data.name}" addon to remove`);
    return;
  }

  addonStore.$patch((state) => {
    state.addons.splice(index, 1);
  });
};
