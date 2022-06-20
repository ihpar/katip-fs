import { Svg, G } from "@svgdotjs/svg.js";
import ScoreElement from "./ScoreElement";
import symbols from "./fonts/FontLoader";
import lineGap from "./Constants";

class ClefSection implements ScoreElement {
  rootGroup: G;

  linesGroup: G;

  marginWidth = 5;

  width = 0;

  clefYOffset = 0;

  clefStr = "gClef";

  constructor(
    private painter: Svg,
    private left: number,
    private top: number,
  ) {
    this.init();
  }

  init() {
    const clefDims = symbols.getDims(this.clefStr);
    this.width = 2 * this.marginWidth + Math.ceil(clefDims[0]);
    // eslint-disable-next-line prefer-destructuring
    this.clefYOffset = clefDims[2];
  }

  render() {
    this.rootGroup = this.painter.group();
    this.linesGroup = this.painter.group();

    // Render staff lines
    for (let i = 0; i < 5; i += 1) {
      this.linesGroup.rect(this.width, 1).move(this.left, i * lineGap + this.top);
    }
    this.linesGroup.addClass("staff-line-color");
    this.rootGroup.add(this.linesGroup);

    this.rootGroup.path(symbols.getPath(this.clefStr))
      .move(this.left + this.marginWidth, this.top + this.clefYOffset)
      .addClass("main-color");
  }
}

export default ClefSection;
