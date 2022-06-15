import { Svg } from "@svgdotjs/svg.js";
import { FontLoader } from "./fonts/FontLoader";
import { ColorScheme } from "./Colors";

export default class Staff {
  index: number;
  top: number;
  width: number;
  painter: Svg;
  symbols: FontLoader;
  colorScheme: ColorScheme;
  hasClef;

  constructor(
    index: number,
    width: number,
    painter: Svg,
    symbols: FontLoader,
    colorScheme: ColorScheme,
    hasClef = false
  ) {
    this.index = index;
    this.top = index * (16 * 9) + (6 * 9);
    this.width = width;
    this.painter = painter;
    this.symbols = symbols;
    this.colorScheme = colorScheme;
    this.hasClef = hasClef;
  }

  render() {
    for (let i = 0; i < 5; i++) {
      this.painter.rect(this.width, 1)
        .y(i * 9 + this.top)
        .fill(this.colorScheme.porteLineColor);
    }

    if (this.hasClef) {
      this.painter.path(this.symbols.getPath("gClef"))
        .center(15, this.top + 18)
        .fill(this.colorScheme.mainColor);
    }
  }
}