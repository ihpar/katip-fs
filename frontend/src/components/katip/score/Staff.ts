import { Svg } from "@svgdotjs/svg.js";
import Measure from "./Measure";
import { Makam } from "models/Makam";
import { Usul } from "models/Usul";
import ScoreElement from "./ScoreElement";
import AccidentalSection from "./AccidentalSection";
import ClefSection from "./ClefSection";
import { lineGap } from "./Constants";

export default class Staff implements ScoreElement {
  top: number;
  elements: ScoreElement[];
  defaultMeasureCount = 6;
  clefSection: ClefSection;
  accidentalsSection: AccidentalSection;

  constructor(
    private index: number,
    public width: number,
    private painter: Svg,
    private defaultMakam: Makam,
    private defaultUsul: Usul
  ) {
    this.top = index * (16 * lineGap) + (6 * lineGap);
    this.elements = [];
    this.init();
  }

  init() {
    this.clefSection = new ClefSection(
      this.painter,
      0,
      this.top
    );

    this.elements.push(this.clefSection);
    const accidentalSectionLeft = this.clefSection.width;

    this.accidentalsSection = new AccidentalSection(
      this.painter,
      1,
      this.defaultMakam.accidentals,
      accidentalSectionLeft,
      this.top,
      false
    );

    this.elements.push(this.accidentalsSection);

    const firstMeasureLeft = accidentalSectionLeft + this.accidentalsSection.width;
    const defaultMeasureWidth = (this.width - firstMeasureLeft) / this.defaultMeasureCount;

    for (let i = 0; i < this.defaultMeasureCount; i++) {
      this.elements.push(
        new Measure(
          this.painter,
          i + 2,
          this.defaultMakam,
          this.defaultUsul,
          firstMeasureLeft + i * defaultMeasureWidth,
          this.top,
          defaultMeasureWidth
        )
      );
    }
  }

  render() {
    this.elements.forEach(element => element.render());
  }
}