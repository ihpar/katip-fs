import { Rect, Svg, G } from "@svgdotjs/svg.js";
import { Makam } from "models/Makam";
import { Usul } from "models/Usul";
import { ColorScheme } from "./Colors";

export default class Measure {
  painter: Svg;
  makam: Makam;
  usul: Usul;
  accidentals: string[];
  hasMakamChange: boolean;
  hasUsulCahnge: boolean;
  index: number;
  colorScheme: ColorScheme;
  rootGroup: G;
  guideLinesGroup: G;

  boundingRect: Rect;
  bar: Rect;
  left: number;
  top: number;
  width: number;
  lineGap = 9;
  showAccidentals: boolean;
  showUsul: boolean;
  renderBar: boolean;

  constructor(
    painter: Svg,
    index: number,
    makam: Makam,
    usul: Usul,
    colorScheme: ColorScheme,
    left: number,
    top: number,
    width: number,
    showAccidentals: boolean,
    showUsul: boolean,
    renderBar: boolean
  ) {
    this.painter = painter;
    this.index = index;
    this.makam = makam;
    this.usul = usul;
    this.colorScheme = colorScheme;
    this.left = left;
    this.top = top;
    this.width = width;
    this.showAccidentals = showAccidentals;
    this.showUsul = showUsul;
    this.renderBar = renderBar;

    this.init();
  }

  init() {
    this.rootGroup = this.painter.group();

    const ghostLineWidth = this.width - 3;
    const ghostLineLeft = this.left + 1;

    // draw top guide lines
    this.guideLinesGroup = this.painter.group();
    for (let i = 0; i < 5; i++) {
      this.guideLinesGroup.rect(ghostLineWidth, 1)
        .move(ghostLineLeft, this.top - (5 - i) * this.lineGap);
    }

    // draw bottom guide lines
    for (let i = 0; i < 5; i++) {
      this.guideLinesGroup.rect(ghostLineWidth, 1)
        .move(ghostLineLeft, this.top + (i + 5) * this.lineGap);
    }
    this.guideLinesGroup.addClass("guide-lines");
    this.rootGroup.add(this.guideLinesGroup);

    // draw bar
    if (this.renderBar) {
      this.rootGroup.rect(1, this.lineGap * 4)
        .move(this.left + this.width - 1, this.top)
        .addClass("measure-bar");
    }

    if (this.showAccidentals) {
      const accidentals = this.makam.accidentals;
      for (let accidental of this.accidentals) {
        // Fa+5-#:4 
        // Si+4-b:1
        const [pitch, acci] = accidental.split("-");
        const [pitchRoot, octave] = pitch.split("+");
        const [acciDirection, acciAmount] = acci.split(":");
      }
      console.log(accidentals);
    }

    // draw bounding rectangle
    this.boundingRect = this.rootGroup.rect(ghostLineWidth, 15 * this.lineGap)
      .move(ghostLineLeft, this.top - 6 * this.lineGap + this.lineGap / 2)
      .fill("transparent");

    this.rootGroup.addClass("measure-root");
  }

  changeColorScheme(colorScheme: ColorScheme) {
    this.colorScheme = colorScheme;
  }
}