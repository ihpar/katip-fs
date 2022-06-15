import { Svg, SVG } from "@svgdotjs/svg.js";
import { ColorScheme } from "./Colors";
import { FontLoader } from "./fonts/FontLoader";
import Staff from "./Staff";

export default class Page {
  scoreRootId: string;
  index: number;
  width: number;
  height: number;
  colorScheme: ColorScheme;
  fontLoader: FontLoader;
  pageId: string;
  svgRootId: string;
  painter: Svg;
  staves: Staff[];
  staveCount = 8;

  constructor(
    scoreRootId: string,
    index: number,
    width: number,
    height: number,
    colorScheme: ColorScheme,
    fontLoader: FontLoader
  ) {
    this.scoreRootId = scoreRootId;
    this.index = index;
    this.width = width;
    this.height = height;
    this.colorScheme = colorScheme;
    this.fontLoader = fontLoader;

    this.pageId = `a4-${this.index}`;
    this.svgRootId = `svg-root-${this.index}`;

    this.painter = SVG();
    this.staves = [];

    this.init();
  }

  init() {
    const A4 = document.createElement("div");
    A4.className = "A4";
    A4.setAttribute("id", this.pageId);

    const svgRoot = document.createElement("div");
    svgRoot.setAttribute("id", this.svgRootId);
    A4.appendChild(svgRoot);

    const root = document.getElementById(this.scoreRootId);
    root?.appendChild(A4);

    this.painter.addTo(svgRoot).size(this.width, this.height);

    for (let i = 0; i < this.staveCount; i++) {
      this.staves.push(
        new Staff(i, this.width, this.painter, this.fontLoader, this.colorScheme)
      );
    }
  }

  changeColorScheme(colorScheme: ColorScheme) {
    this.colorScheme = colorScheme;
    for (let staff of this.staves) {
      staff.changeColorScheme(this.colorScheme);
    }
  }
}