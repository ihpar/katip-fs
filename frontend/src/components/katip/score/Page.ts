import { Svg, SVG } from "@svgdotjs/svg.js";
import Makam from "models/Makam";
import Usul from "models/Usul";
import Staff from "./Staff";

export default class Page {
  pageId: string;

  svgRootId: string;

  painter: Svg;

  staves: Staff[];

  staveCount = 8;

  constructor(
    private scoreRootId: string,
    private index: number,
    private width: number,
    private height: number,
    private defaultMakam: Makam,
    private defaultUsul: Usul,
  ) {
    this.pageId = `a4-${this.index}`;
    this.svgRootId = `svg-root-${this.index}`;

    this.painter = SVG();
    this.staves = [];

    this.init();
    this.initStaves();
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
  }

  initStaves() {
    for (let i = 0; i < this.staveCount; i += 1) {
      this.staves.push(
        new Staff(
          i,
          this.width,
          this.painter,
          this.defaultMakam,
          this.defaultUsul,
        ),
      );
    }

    this.staves.forEach((staff) => staff.render());
  }
}
