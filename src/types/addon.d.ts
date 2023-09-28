export interface Addon {
  readonly name: string;
  readonly uri: string;

  displayName?: string;
  authors?: string[];
  description?: string;
  size?: number;
  hasPlugin?: boolean;
  processing?: boolean;
  hasUpdate?: boolean;
  enabled?: boolean[];
  installed?: boolean;
}
