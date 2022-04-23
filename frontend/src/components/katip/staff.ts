class Staff {
  satirNo: number;
  parentScore: any;
  paper: any;
  configs: any;
  left: number;
  top: number;
  width: number;
  measures: any[];
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

  addMeasure(measure: any): void {
    measure.setArrIdx(this.lastMeasureIdx);
    this.lastMeasureIdx += 1;
    this.measures.push(measure);
  }

  drawSatir(): void {
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

  notifyWidthChange(idx: number, widthDiff: number): void {
    for (let i = idx + 1; i < this.measures.length; i++) {
      this.measures[i].shiftPosition(widthDiff);
    }
  }

  changeMakamAndMeter(makam: any, accidentals: any, usul: any, meter: any): void {
    for (let measure of this.measures) {
      measure.setMeasureMeter(meter[0] + "/" + meter[1]);
      measure.setMeasureAccidentals(accidentals);
      measure.eraseMeasure();
    }
    this.drawSatir();
  }

  deleteSatirNote(measureIdx: number, noteIdx: number): void {
    this.measures[measureIdx].deleteNoteAt(noteIdx);
  }

  deleteMeasureAtIdx(measureIdx: number, left: number, width: number): void {
    this.measures.splice(measureIdx, 1);
    this.lastMeasureIdx -= 1;
    this.lastMeasureLeft = left;
    for (let i = measureIdx; i < this.measures.length; i++) {
      this.measures[i].setArrIdx(i);
      this.measures[i].shiftPosition(-width);
    }
  }

  requestNewMeasure(measureArrIdx: number, left: number, meter: any, acci: any): void {
    if (this.measures.length > measureArrIdx + 1) {
      return;
    }
    this.lastMeasureLeft = left;
    // let measure = new Measure(meter, acci);
    // measure.setSParams(this.getMWParams());
    // this.lastMeasureLeft += measure.drawMeasure();
    // this.addMeasure(measure);
  }

  getMeasures(): any[] {
    return this.measures;
  }

  handleMouse(x: number, y: number): void {
    for (let measure of this.measures) {
      measure.mouseOver(x, y);
    }
  }

  handleClick = function (x: number, y: number): void {
    // for (let measure of this.measures) {
    //   measure.mouseClick(x, y);
    // }
  };
}

export default Staff;
