export interface Theme {
  colors: Record<string, Record<number, string>>;
  extend?: Partial<Theme>;
}
