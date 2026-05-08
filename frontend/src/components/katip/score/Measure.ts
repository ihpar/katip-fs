import { Rect, Svg, G } from "@svgdotjs/svg.js";
import Makam from "models/Makam";
import Usul from "models/Usul";
import ScoreElement from "./ScoreElement";
import lineGap from "./Constants";

export default class Measure implements ScoreElement {
  hasMakamChange: boolean;

  hasUsulCahnge: boolean;

  rootGroup: G;

  guideLinesGroup: G;

  staffLinesGroup: G;

  boundingRect: Rect;

  bar: Rect;

  showAccidentals: boolean;

  showUsul: boolean;

  renderBar: boolean;

  constructor(
    private painter: Svg,
    private index: number,
    private makam: Makam,
    private usul: Usul,
    private left: number,
    private top: number,
    private initialWidth: number,
  ) {
    this.init();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
  }

  render() {
    this.rootGroup = this.painter.group();

    const ghostLineWidth = this.initialWidth - 3;
    const ghostLineLeft = this.left + 1;

    // draw top guide lines
    this.guideLinesGroup = this.painter.group();
    for (let i = 0; i < 5; i += 1) {
      this.guideLinesGroup.rect(ghostLineWidth, 1)
        .move(ghostLineLeft, this.top - (5 - i) * lineGap);
    }

    // draw staff lines
    this.staffLinesGroup = this.painter.group();
    for (let i = 0; i < 5; i += 1) {
      this.staffLinesGroup.rect(this.initialWidth, 1)
        .move(this.left, this.top + i * lineGap);
    }
    this.staffLinesGroup.addClass("staff-line-color");
    this.rootGroup.add(this.staffLinesGroup);

    // draw bar
    this.rootGroup.rect(1, lineGap * 4)
      .move(this.left + this.initialWidth - 1, this.top)
      .addClass("staff-line-color");

    // draw bottom guide lines
    for (let i = 0; i < 5; i += 1) {
      this.guideLinesGroup.rect(ghostLineWidth, 1)
        .move(ghostLineLeft, this.top + (i + 5) * lineGap);
    }
    this.guideLinesGroup.addClass("guide-lines");
    this.rootGroup.add(this.guideLinesGroup);

    // draw bounding rectangle
    this.boundingRect = this.rootGroup.rect(ghostLineWidth, 15 * lineGap)
      .move(ghostLineLeft, this.top - 6 * lineGap + lineGap / 2)
      .fill("transparent");

    this.rootGroup.addClass("measure-root");
  }

  get width() {
    return this.left;
  }
}
