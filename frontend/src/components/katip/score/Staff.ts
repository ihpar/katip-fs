import { Svg, Rect, Path } from "@svgdotjs/svg.js";
import { FontLoader } from "./fonts/FontLoader";
import { ColorScheme } from "./Colors";
import Measure from "./Measure";
import { ALL_MAKAMS, ALL_USULS } from "../sheet/constants";

export default class Staff {
  index: number;
  top: number;
  width: number;
  painter: Svg;
  symbols: FontLoader;
  colorScheme: ColorScheme;
  staffLines: Rect[];
  clef: Path;
  bar: Rect;
  measures: Measure[];
  measureOffset: number;
  defaultMeasureWidth: number;
  defaultMakam = ALL_MAKAMS.find(makam => makam.id === "ussak")!;
  defaultUsul = ALL_USULS.find(usul => usul.id === "sofyan_4_4")!;

  defaultMeasureCount = 6;
  firstMeasureMargin = 10;
  lineGap = 9;

  constructor(
    index: number,
    width: number,
    painter: Svg,
    symbols: FontLoader,
    colorScheme: ColorScheme
  ) {
    this.index = index;
    this.top = index * (16 * this.lineGap) + (6 * this.lineGap);
    this.width = width;
    this.painter = painter;
    this.symbols = symbols;
    this.colorScheme = colorScheme;
    this.staffLines = [];
    this.measures = [];
    this.measureOffset = Math.floor(this.symbols.getDims("gClef")[0] + this.firstMeasureMargin);
    this.defaultMeasureWidth = Math.round(
      (this.width - this.measureOffset) * 100 / this.defaultMeasureCount
    ) / 100;

    this.init();
  }

  init() {
    this.drawStaff();
    for (let i = 0; i < this.defaultMeasureCount; i++) {
      this.measures.push(
        new Measure(
          this.painter,
          i,
          this.defaultMakam,
          this.defaultUsul,
          this.colorScheme,
          this.measureOffset + i * this.defaultMeasureWidth,
          this.top,
          this.defaultMeasureWidth,
          i === 0,
          i === 0,
          i !== this.defaultMeasureCount - 1
        )
      );
    }
  }

  drawStaff() {
    // Render staff lines
    for (let i = 0; i < 5; i++) {
      this.staffLines.push(
        this.painter.rect(this.width, 1)
          .y(i * 9 + this.top)
          .fill(this.colorScheme.staffLineColor)
      );
    }

    // render final bar
    this.bar = this.painter.rect(1, this.lineGap * 4)
      .move(this.width - 1, this.top)
      .fill(this.colorScheme.staffLineColor);

    // render clef
    this.clef = this.painter.path(this.symbols.getPath("gClef"))
      .center(15, this.top + 18)
      .fill(this.colorScheme.mainColor);
  }

  changeColorScheme(colorScheme: ColorScheme) {
    this.colorScheme = colorScheme;

    for (let staffLine of this.staffLines) {
      staffLine.fill(this.colorScheme.staffLineColor);
    }

    this.clef.fill(this.colorScheme.mainColor);
    this.bar.fill(this.colorScheme.staffLineColor);

    for (let measure of this.measures) {
      measure.changeColorScheme(colorScheme);
    }
  }
}