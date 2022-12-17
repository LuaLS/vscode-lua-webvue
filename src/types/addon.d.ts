/** `config.json` file structure for an addon */
export type AddonConfig = {
  name: string;
  description: string;
  settings: { [index: string]: Object };
};

/** A local addon as it is received in a message from VS Code */
export type LocalAddonFromVSCode = {
  name: string;
  description: string;
  size: number;
  installDate: number;
};
