import Measure from "./Measure";

export function SatirObject(satirNo, paper, configs, left, top, width, parentScore) {
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

  this.getMWParams = function () {
    return {
      startLeft: this.lastMeasureLeft,
      startTop: this.top,
      cfg: this.configs,
      endPos: this.width + this.left,
      paper: this.paper,
      parentSatir: this,
      satirNo: this.satirNo,
    };
  };

  this.addMeasure = function (measure) {
    measure.setArrIdx(this.lastMeasureIdx);
    this.lastMeasureIdx += 1;
    this.measures.push(measure);
  };

  this.drawSatir = function () {
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
  };

  this.notifyWidthChange = function (idx, widthDiff) {
    for (let i = idx + 1; i < this.measures.length; i++) {
      this.measures[i].shiftPosition(widthDiff);
    }
  };

  this.changeMakamAndMeter = function (makam, accidentals, usul, meter) {
    for (let measure of this.measures) {
      measure.setMeasureMeter(meter[0] + "/" + meter[1]);
      measure.setMeasureAccidentals(accidentals);
      measure.eraseMeasure();
    }
    this.drawSatir();
  };

  this.deleteSatirNote = function (measureIdx, noteIdx) {
    this.measures[measureIdx].deleteNoteAt(noteIdx);
  };

  this.deleteMeasureAtIdx = function (measureIdx, left, width) {
    this.measures.splice(measureIdx, 1);
    this.lastMeasureIdx -= 1;
    this.lastMeasureLeft = left;
    for (let i = measureIdx; i < this.measures.length; i++) {
      this.measures[i].setArrIdx(i);
      this.measures[i].shiftPosition(-width);
    }
  };

  this.requestNewMeasure = function (measureArrIdx, left, meter, acci) {
    if (this.measures.length > measureArrIdx + 1) {
      return;
    }
    this.lastMeasureLeft = left;
    let measure = new Measure(meter, acci);
    measure.setSParams(this.getMWParams());
    this.lastMeasureLeft += measure.drawMeasure();
    this.addMeasure(measure);
  };

  this.getMeasures = function () {
    return this.measures;
  };

  this.handleMouse = function (x, y) {
    for (let measure of this.measures) {
      measure.mouseOver(x, y);
    }
  };

  this.handleClick = function (x, y) {
    for (let measure of this.measures) {
      measure.mouseClick(x, y);
    }
  };
}
