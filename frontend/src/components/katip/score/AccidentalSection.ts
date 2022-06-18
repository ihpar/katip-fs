import { Svg, G } from "@svgdotjs/svg.js";
import ScoreElement from "./ScoreElement";
import Accidental from "./Accidental";
import { lineGap } from "./Constants";

class AccidentalSection implements ScoreElement {
  rootGroup: G;
  linesGroup: G;
  marginWidth = 5;
  gap = 4;
  width = 0;
  accidentals: Accidental[];

  constructor(
    private painter: Svg,
    private index: number,
    private accidentalStrs: string[],
    private left: number,
    private top: number,
    private renderBar: boolean
  ) {
    this.accidentals = [];
    this.init();
  }

  init() {
    if (this.accidentalStrs.length === 0) return;

    this.rootGroup = this.painter.group();

    this.width = this.marginWidth;
    this.accidentalStrs.forEach(accidentalStr => {
      const accidental = new Accidental(accidentalStr, this.rootGroup);
      this.accidentals.push(accidental);
      this.width += accidental.width;
    });
    this.width += (this.accidentalStrs.length - 1) * this.gap;
    this.width += this.marginWidth;
    this.width = Math.ceil(this.width);
  }

  render() {
    if (this.accidentals.length === 0) return;

    this.linesGroup = this.painter.group();
    // Render staff lines
    for (let i = 0; i < 5; i++) {
      this.linesGroup.rect(this.width, 1).move(this.left, i * 9 + this.top);
    }
    // render final bar
    if (this.renderBar) {
      this.linesGroup.rect(1, lineGap * 4).move(this.width - 1, this.top);
    }
    this.linesGroup.addClass("staff-line-color");
    this.rootGroup.add(this.linesGroup);

    // render accidental symbols
    let left = this.left + this.marginWidth;
    let top = this.top;
    this.accidentals.forEach(accidental => {
      accidental.render(left, top);
      left += accidental.width + this.gap;
    });
  }
}

export default AccidentalSection;