import { Svg, G } from "@svgdotjs/svg.js";
import Usul from "models/Usul";
import ScoreElement from "./ScoreElement";
import lineGap from "./Constants";
import symbols from "./fonts/FontLoader";

class UsulSection implements ScoreElement {
  rootGroup: G;

  linesGroup: G;

  numeratorGroup: G;

  denominatorGroup: G;

  marginWidth = 5;

  gap = 2;

  width = 0;

  numNumbers: string[];

  denNumbers: string[];

  constructor(
    private painter: Svg,
    private index: number,
    private usul: Usul,
    private left: number,
    private top: number,
  ) {
    this.init();
  }

  init() {
    if (this.usul.numerator === 0) return;
    this.width = this.marginWidth;

    // calculate numerator width
    this.numNumbers = Array.from(this.usul.numerator.toString());
    const numNumbersWidth = this.numNumbers.reduce((sum, num) => sum + symbols.getDims(num)[0], 0);
    const numWidth = (this.numNumbers.length - 1) * this.gap + numNumbersWidth;

    // calculate denominator width
    this.denNumbers = Array.from(this.usul.denominator.toString());
    const denNumbersWidth = this.denNumbers.reduce((sum, num) => sum + symbols.getDims(num)[0], 0);
    const denWidth = (this.denNumbers.length - 1) * this.gap + denNumbersWidth;

    this.width += Math.ceil(Math.max(numWidth, denWidth) + this.marginWidth);
  }

  render() {
    if (this.usul.numerator === 0) return;

    this.rootGroup = this.painter.group();
    this.linesGroup = this.painter.group();
    // Render staff lines
    for (let i = 0; i < 5; i += 1) {
      this.linesGroup.rect(this.width, 1).move(this.left, i * 9 + this.top);
    }
    this.linesGroup.addClass("staff-line-color");
    this.rootGroup.add(this.linesGroup);

    // render usul symbols
    const left = this.left + this.marginWidth;
    let { top } = this;

    // render numerator group
    this.numeratorGroup = this.painter.group();
    let numGLeft = left;
    this.numNumbers.forEach((num) => {
      this.numeratorGroup.path(symbols.getPath(num))
        .move(numGLeft, top);
      numGLeft += symbols.getDims(num)[0] + this.gap;
    });
    const numGWidth = numGLeft - this.gap - left;
    this.numeratorGroup.addClass("note-color");
    this.rootGroup.add(this.numeratorGroup);

    // render denominator group
    top += lineGap * 2;
    this.denominatorGroup = this.painter.group();
    let denGLeft = left;
    this.denNumbers.forEach((num) => {
      this.denominatorGroup.path(symbols.getPath(num))
        .move(denGLeft, top);
      denGLeft += symbols.getDims(num)[0] + this.gap;
    });
    const denGWidth = denGLeft - this.gap - left;
    this.denominatorGroup.addClass("note-color");
    this.rootGroup.add(this.denominatorGroup);

    // center numerator G and denominator G
    const shift = (numGWidth - denGWidth) / 2;
    if (shift < 0) {
      this.numeratorGroup.dx(-shift);
    } else {
      this.denominatorGroup.dx(shift);
    }
  }
}

export default UsulSection;
