import addLocalAddon from "./addLocalAddon";
import removeLocalAddon from "./removeLocalAddon";
import addRemoteAddon from "./addRemoteAddon";
import workspaceOpen from "./workspaceOpen";
import localAddonStore from "./localAddonStore";
import remoteAddonStore from "./remoteAddonStore";
import appStore from "./appStore";

export const commands: { [index: string]: (data: any) => any } = {
  addLocalAddon,
  removeLocalAddon,
  addRemoteAddon,
  workspaceOpen,
  localAddonStore,
  remoteAddonStore,
  appStore,
};
