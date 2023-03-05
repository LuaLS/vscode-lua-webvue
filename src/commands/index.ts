import workspaceOpen from "./workspaceOpen";
import localAddonStore from "./addonStore";
import appStore from "./appStore";
import addAddon from "./addAddon";
import addonStore from "./addonStore";
import notify from "./notify";

export const commands: { [index: string]: (data: any) => any } = {
  workspaceOpen,
  localAddonStore,
  appStore,
  addAddon,
  addonStore,
  notify,
};
