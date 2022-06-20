import { Theme } from "store/slices/theme";

export interface ColorScheme {
  highColor: string,
  noteColor: string,
  noteErrColor: string,
  mainColor: string,
  staffLineColor: string,
  ghostColor: string,
  guideLineColor: string,
}

export const colorSchemes: { [key: string]: ColorScheme; } = {
  [Theme.Light]: {
    highColor: "#46879E",
    noteColor: "#243041",
    noteErrColor: "#9B1800",
    mainColor: "#565345",
    staffLineColor: "#BDA37E",
    ghostColor: "#998166",
    guideLineColor: "#E5DCD0",
  },
  [Theme.Dark]: {
    highColor: "#389edb",
    noteColor: "#38c9a9",
    noteErrColor: "#ff5f57",
    mainColor: "#8fb2c7",
    staffLineColor: "#698a96",
    ghostColor: "#288a7d",
    guideLineColor: "#4d5a5e",
  },
};
