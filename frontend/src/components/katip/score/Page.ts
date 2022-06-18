import { Svg, SVG } from "@svgdotjs/svg.js";
import { Makam } from "models/Makam";
import { Usul } from "models/Usul";
import { ColorScheme } from "./Colors";
import Staff from "./Staff";

export default class Page {
  scoreRootId: string;
  index: number;
  width: number;
  height: number;
  colorScheme: ColorScheme;
  pageId: string;
  svgRootId: string;
  painter: Svg;
  staves: Staff[];
  defaultMakam: Makam;
  defaultUsul: Usul;
  staveCount = 8;

  constructor(
    scoreRootId: string,
    index: number,
    width: number,
    height: number,
    colorScheme: ColorScheme,
    defaultMakam: Makam,
    defaultUsul: Usul
  ) {
    this.scoreRootId = scoreRootId;
    this.index = index;
    this.width = width;
    this.height = height;
    this.colorScheme = colorScheme;
    this.defaultMakam = defaultMakam;
    this.defaultUsul = defaultUsul;

    this.pageId = `a4-${this.index}`;
    this.svgRootId = `svg-root-${this.index}`;

    this.painter = SVG();
    this.staves = [];

    this.initPage();
    this.initStaves();
  }

  initPage() {
    const A4 = document.createElement("div");
    A4.className = "A4";
    A4.setAttribute("id", this.pageId);

    const svgRoot = document.createElement("div");
    svgRoot.setAttribute("id", this.svgRootId);
    A4.appendChild(svgRoot);

    const root = document.getElementById(this.scoreRootId);
    root?.appendChild(A4);

    this.painter.addTo(svgRoot).size(this.width, this.height);
  }

  initStaves() {
    for (let i = 0; i < this.staveCount; i++) {
      this.staves.push(
        new Staff(
          i,
          this.width,
          this.painter,
          this.colorScheme,
          this.defaultMakam,
          this.defaultUsul
        )
      );
    }
  }

  changeColorScheme(colorScheme: ColorScheme) {
    this.colorScheme = colorScheme;
    this.staves.forEach(staff => staff.changeColorScheme(this.colorScheme));
  }
}