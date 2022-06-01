import Measure from "./Measure";

class SatirObject {
  satirNo: number;
  parentScore: any;
  paper: any;
  configs: any;
  left: number;
  top: number;
  width: number;
  measures: Measure[];
  lastMeasureIdx: number;
  lastMeasureLeft: number;

  constructor(satirNo: number, paper: any, configs: any, left: number, top: number, width: number, parentScore: any) {
    this.satirNo = satirNo;
    this.parentScore = parentScore;
    this.paper = paper;
    this.configs = configs;
    this.left = left;
    this.top = top;
    this.width = width;
    this.measures = [];
    this.lastMeasureIdx = 0;
    this.lastMeasureLeft = this.left;
  }

  getMWParams() {
    return {
      startLeft: this.lastMeasureLeft,
      startTop: this.top,
      cfg: this.configs,
      endPos: this.width + this.left,
      paper: this.paper,
      parentSatir: this,
      satirNo: this.satirNo,
    };
  }

  addMeasure(measure: Measure) {
    measure.setArrIdx(this.lastMeasureIdx);
    this.lastMeasureIdx += 1;
    this.measures.push(measure);
  }

  drawSatir() {
    this.lastMeasureLeft = this.left;

    for (let i = 0; i < this.measures.length; i++) {
      this.measures[i].setSParams(this.getMWParams());
      if (i === 0) {
        this.measures[i].setClefVisibility(true);
        this.measures[i].setGAcciVisibility(true);
        if (this.satirNo === 0) {
          this.measures[i].setMeterVisibility(true);
        }
      }
      this.lastMeasureLeft += this.measures[i].drawMeasure();
    }
  }

  notifyWidthChange(idx: number, widthDiff: number) {
    for (let i = idx + 1; i < this.measures.length; i++) {
      this.measures[i].shiftPosition(widthDiff);
    }
  }

  changeMakamAndMeter(makam: any, accidentals: string[], usul: any, meter: number[]) {
    for (let measure of this.measures) {
      measure.setMeasureMeter(meter);
      measure.setMeasureAccidentals(accidentals);
      measure.eraseMeasure();
    }
    this.drawSatir();
  }

  updateColorScheme(colorScheme: { [key: string]: string; }) {
    for (let measure of this.measures) {
      measure.updateColorScheme(colorScheme);
    }
  }

  deleteSatirNote(measureIdx: number, noteIdx: number) {
    this.measures[measureIdx].deleteNoteAt(noteIdx);
  }

  deleteMeasureAtIdx(measureIdx: number, left: number, width: number) {
    this.measures.splice(measureIdx, 1);
    this.lastMeasureIdx -= 1;
    this.lastMeasureLeft = left;
    for (let i = measureIdx; i < this.measures.length; i++) {
      this.measures[i].setArrIdx(i);
      this.measures[i].shiftPosition(-width);
    }
  }

  requestNewMeasure(measureArrIdx: number, left: number, meter: number[], acci: string[]) {
    if (this.measures.length > measureArrIdx + 1) {
      return;
    }
    this.lastMeasureLeft = left;
    let measure = new Measure(meter, acci);
    measure.setSParams(this.getMWParams());
    this.lastMeasureLeft += measure.drawMeasure();
    this.addMeasure(measure);
  }

  getMeasures() {
    return this.measures;
  }

  handleMouse(x: number, y: number) {
    for (let measure of this.measures) {
      measure.mouseOver(x, y);
    }
  };

  handleClick(x: number, y: number) {
    for (let measure of this.measures) {
      measure.mouseClick(x, y);
    }
  }
}

export default SatirObject;