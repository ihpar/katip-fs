import { Svg } from "@svgdotjs/svg.js";
import Makam from "models/Makam";
import Usul from "models/Usul";
import lineGap from "./Constants";
import Measure from "./Measure";
import ScoreElement from "./ScoreElement";
import AccidentalSection from "./AccidentalSection";
import ClefSection from "./ClefSection";
import UsulSection from "./UsulSection";

export default class Staff implements ScoreElement {
  top: number;

  elements: ScoreElement[];

  defaultMeasureCount = 6;

  clefSection: ClefSection;

  accidentalsSection: AccidentalSection;

  usulSection: UsulSection;

  constructor(
    private index: number,
    public width: number,
    private painter: Svg,
    private defaultMakam: Makam,
    private defaultUsul: Usul,
  ) {
    this.top = index * (16 * lineGap) + (6 * lineGap);
    this.elements = [];
    this.init();
  }

  init() {
    let nextElementLeft = 0;
    this.clefSection = new ClefSection(
      this.painter,
      0,
      this.top,
    );
    this.elements.push(this.clefSection);
    nextElementLeft += this.clefSection.width;

    this.accidentalsSection = new AccidentalSection(
      this.painter,
      1,
      this.defaultMakam.accidentals,
      nextElementLeft,
      this.top,
      false,
    );
    this.elements.push(this.accidentalsSection);
    nextElementLeft += this.accidentalsSection.width;

    if (this.index === 0) {
      this.usulSection = new UsulSection(
        this.painter,
        2,
        this.defaultUsul,
        nextElementLeft,
        this.top,
      );
      this.elements.push(this.usulSection);
      nextElementLeft += this.usulSection.width;
    }

    const defaultMeasureWidth = (this.width - nextElementLeft) / this.defaultMeasureCount;
    for (let i = 0; i < this.defaultMeasureCount; i += 1) {
      this.elements.push(
        new Measure(
          this.painter,
          i,
          this.defaultMakam,
          this.defaultUsul,
          nextElementLeft + i * defaultMeasureWidth,
          this.top,
          defaultMeasureWidth,
        ),
      );
    }
  }

  render() {
    this.elements.forEach((element) => element.render());
  }
}
