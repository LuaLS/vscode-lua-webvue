import accessToken from "./accessToken";
import localAddons from "./localAddons";

export const commands: { [index: string]: (data: any) => any } = {
  accessToken,
  localAddons,
};
