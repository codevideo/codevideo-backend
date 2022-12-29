export interface IColorTheme {
    base: string;
    inherit: boolean;
    rules: {
      background?: string;
      foreground?: string;
      fontStyle?: string;
      token: string;
    }[];
    colors: { [color: string]: string };
  }