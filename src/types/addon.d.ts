export interface Addon {
  name: string;
  displayName?: string;
  description?: string;
  size?: number;
  hasPlugin?: boolean;
  processing?: boolean;
}

export interface LocalAddon extends Addon {
  enabled?: boolean;
  hasUpdate?: boolean;
  installTimestamp?: number;
}

export interface RemoteAddon extends Addon {
  sha?: string;
  uri?: string;
  latestCommitTimestamp?: number;
}
