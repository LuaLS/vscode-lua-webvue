/** `config.json` file structure for an addon */
export type AddonConfig = {
  name: string;
  description: string;
  settings: { [index: string]: Object };
};

export interface Addon {
  name: string;
  displayName?: string;
  description?: string;
  size?: number;
  hasPlugin?: boolean;
}

export interface LocalAddon extends Addon {
  enabled?: boolean;
  hasUpdate?: boolean;
  installTimestamp?: number;
}

export interface RemoteAddon extends Addon {
  latestCommitTimestamp?: number;
}
