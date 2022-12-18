import accessToken from "./accessToken";
import localAddons from "./localAddons";
import workspaceOpen from "./workspaceOpen";

export const commands: { [index: string]: (data: any) => any } = {
  accessToken,
  localAddons,
  workspaceOpen,
};
