/** `config.json` file structure for an addon */
export type AddonConfig = {
  name: string;
  description: string;
  settings: { [index: string]: Object };
};

/** A local addon as it is received in a message from VS Code */
export type LocalAddonFromVSCode = {
  name: string;
  displayName: string;
  enabled: boolean;
  description: string | undefined;
  size: number;
  installDate: number | undefined;
  hasPlugin: boolean;
};
