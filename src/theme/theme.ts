export interface Theme {
  colors: Record<string, string | Record<number, string>>;
  extend?: Partial<Theme>;
}
