export interface ListItem<
  V extends string | number = string,
  D extends Record<string, unknown> = Record<string, unknown>,
> {
  value: V;
  label: string;
  data?: D;
}
