import { mParams } from "./mparams";
import { notePositions, notePositionsRev, symbols } from "../constants";
import Note from "./Note";
import { playNote, allowNewInsertion } from "./utils";

function noteGClick(e: any, sender: any, stCol: string, selCol: string, note: Note) {
  if (sender.attr("selected") === "yes") {
    sender.attr({ fill: stCol, selected: "no" });
    mParams.highElem = null;
  } else {
    if (mParams.highElem) {
      mParams.highElem.attr({ fill: stCol, selected: "no" });
      mParams.highElem = null;
    }
    sender.attr({ fill: selCol, selected: "yes" });
    mParams.highElem = sender;
    playNote(note);
  }
}

class Measure {
  notes: Note[];
  allYPos: number[];
  noteLefts: number[];
  arrIdx: number;
  parentSatir: any;
  satirNo = null;
  paper: any;
  mainGroup: any;
  accidentalsGroup: any;
  meterGroup: any;
  staffGroup: any;
  guideGroup: any;
  notesGroup: any;
  clefObj: any;

  mAccJson: { [key: string]: string; };
  mAccArr: Note[];

  meter: {
    strVer: string,
    num: number,
    den: number,
  };

  lastDrawnWidth: number;
  compressedWidth: number;

  widthDiff: number;
  startPos: number;
  notesStartPos: number;
  endPos: number;
  satirEndPos: number;
  porteTop: number;
  box: {
    top: number,
    right: number,
    bottom: number,
    left: number,
  };
  ghostColor: string;
  ghostLineColor: string;
  mainColor: string;
  highColor: string;
  ghostsVisible: boolean;
  porteLiHe: number;
  maxSpace: number;
  minSpace: number;
  lineThickness: number;
  emptyMeasureWidth: number;
  highlightColor: string;
  noteColor: string;
  noteErrColor: string;
  porteLineColor: string;

  clefVisible = false;
  meterVisible = false;
  gAcciVisible = false;

  constructor(meter: number[], accidentals: string[]) {
    this.notes = [];
    this.allYPos = [];
    this.noteLefts = [];
    this.arrIdx = 0;
    this.parentSatir = null;
    this.satirNo = null;
    this.paper = null;
    this.mainGroup = null;
    this.accidentalsGroup = null;
    this.meterGroup = null;
    this.staffGroup = null;
    this.guideGroup = null;
    this.notesGroup = null;
    this.clefObj = null;

    this.mAccJson = {};
    this.mAccArr = [];
    for (let accidental of accidentals) {
      let note = new Note(accidental, "1/1");
      this.mAccJson[note.noteRoot] = note.noteComma;
      this.mAccArr.push(note);
    }
    this.meter = {
      strVer: meter[0] + "/" + meter[1],
      num: meter[0],
      den: meter[1],
    };

    this.lastDrawnWidth = 0;
    this.compressedWidth = 0;

    this.widthDiff = 0;
    this.startPos = 0;
    this.notesStartPos = 0;
    this.endPos = 0;
    this.satirEndPos = 0;
    this.porteTop = 0;
    this.box = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    this.ghostColor = "";
    this.ghostLineColor = "";
    this.mainColor = "";
    this.highColor = "";
    this.ghostsVisible = false;
    this.porteLiHe = 10;
    this.maxSpace = 0;
    this.minSpace = 0;
    this.lineThickness = 0;
    this.emptyMeasureWidth = 0;
    this.highlightColor = "";
    this.noteColor = "";
    this.noteErrColor = "";
    this.porteLineColor = "";

    this.clefVisible = false;
    this.meterVisible = false;
    this.gAcciVisible = false;
  }

  setArrIdx(idx: number) {
    this.arrIdx = idx;
    if (this.notesGroup) {
      let noteIdx = 0;
      for (let note of this.notesGroup.children()) {
        note.attr({ smn: [this.satirNo, this.arrIdx, noteIdx].join(",") });
        noteIdx += 1;
      }
    }
  }

  setBoundingBox(start: number, end: number) {
    this.endPos = this.startPos + end;
    this.box.top = this.porteTop - this.porteLiHe * 5;
    this.box.right = this.endPos;
    this.box.bottom = this.porteTop + this.porteLiHe * 9;
    this.box.left = this.startPos + start;
    // set y coords of all possible notes
    for (let i = -10; i <= 18; i++) {
      this.allYPos.push(this.porteTop + (this.porteLiHe / 2) * i);
    }
  }

  setClefVisibility(isVisible: boolean) {
    this.clefVisible = isVisible;
  }

  setGAcciVisibility(isVisible: boolean) {
    this.gAcciVisible = isVisible;
  }

  setMeasureAccidentals(accidentals: string[]) {
    this.mAccJson = {};
    this.mAccArr = [];
    for (let accidental of accidentals) {
      let note = new Note(accidental, "1/1");
      this.mAccJson[note.noteRoot] = note.noteComma;
      this.mAccArr.push(note);
    }
  }

  setMeasureMeter(strMeter: number[]) {
    /*
    console.log("strMeter:", strMeter);
    this.meter.strVer = strMeter;
    let parts = strMeter.split("/");
    this.meter.num = parseInt(parts[0]);
    this.meter.den = parseInt(parts[1]);
    */
    this.meter.num = strMeter[0];
    this.meter.den = strMeter[1];
  }

  setMeterVisibility(isVisible: boolean) {
    this.meterVisible = isVisible;
  }

  // TODO: fix any
  setSParams(sParams: any) {
    this.parentSatir = sParams.parentSatir;
    this.paper = sParams.paper;
    let sp = Object.assign({}, sParams);
    this.satirNo = sp.satirNo;
    this.startPos = sp.startLeft;
    this.porteTop = sp.startTop;
    this.porteLiHe = 10;
    this.lineThickness = 1;
    this.ghostColor = sp.cfg.colorScheme.ghostColor;
    this.mainColor = sp.cfg.colorScheme.mainColor;

    this.ghostLineColor = sp.cfg.colorScheme.ghostLineColor;
    this.emptyMeasureWidth = sp.cfg.emptyMeasureWidth;
    this.satirEndPos = sp.endPos;
    this.highlightColor = sp.cfg.colorScheme.highColor;
    this.noteColor = sp.cfg.colorScheme.noteColor;
    this.noteErrColor = sp.cfg.colorScheme.noteErrColor;
    this.porteLineColor = sp.cfg.colorScheme.porteLineColor;
    this.maxSpace = 12;
    this.minSpace = 8;
  }

  setWidthDiff(diff: number) {
    this.widthDiff = diff;
  }

  getAccidentalsStr() {
    let res = [];
    for (let note of this.mAccArr) {
      res.push(note.toNoteStr(true, false));
    }
    return res;
  }

  getMeter() {
    return [this.meter.num, this.meter.den];
  }

  getNotes() {
    return this.notes;
  }

  getReqAccidental(note: Note, accidentals: { [key: string]: string; }) {
    let noteName = note.noteRoot;
    let noteAcc = note.noteComma;
    if (noteName in accidentals) {
      let globAcc = accidentals[noteName];
      if (noteAcc === globAcc) {
        return "";
      } else {
        if (noteAcc === "") {
          delete accidentals[noteName];
          return "n";
        }
        accidentals[noteName] = noteAcc;
        return noteAcc;
      }
    } else {
      accidentals[noteName] = noteAcc;
    }
    return noteAcc;
  }

  getReqAccidentalAtPos(noteRoot: string, forcedAcci: string, pos: number) {
    let accidentals = JSON.parse(JSON.stringify(this.mAccJson));

    let notePitch = noteRoot.slice(0, -1);
    if (notePitch in accidentals) {
      if (!forcedAcci) {
        return accidentals[notePitch];
      } else {
        if (forcedAcci === "n") {
          forcedAcci = "";
        }
        return forcedAcci;
      }
    } else {
      if (forcedAcci === "n") {
        forcedAcci = "";
      }
      return forcedAcci;
    }
  }

  addNote(pitch: string, dur: string) {
    let note = new Note(pitch, dur);
    this.notes.push(note);
    mParams.totalNoteCount += 1;
  }

  deleteNoteAt(noteIdx: number) {
    this.notes.splice(noteIdx, 1);
    mParams.totalNoteCount -= 1;
    mParams.highElem = null;
    if (mParams.totalNoteCount < 8) {
      allowNewInsertion(true);
    }
    if (this.isEmpty() && this.arrIdx > 0) {
      this.eraseMeasure();
      this.parentSatir.deleteMeasureAtIdx(this.arrIdx, this.startPos, this.lastDrawnWidth);
      return;
    }
    this.refreshMeasure();
  }

  eraseMeasure() {
    this.allYPos = [];
    this.noteLefts = [];
    if (this.mainGroup) {
      this.mainGroup.remove();
      this.mainGroup = null;
      this.accidentalsGroup = null;
      this.meterGroup = null;
      this.staffGroup = null;
      this.guideGroup = null;
      this.notesGroup = null;
      this.clefObj = null;
    }
  }

  refreshMeasure() {
    this.eraseMeasure();
    let previousWid = this.lastDrawnWidth;
    this.drawMeasure();
    let currentWid = this.lastDrawnWidth;
    this.parentSatir.notifyWidthChange(this.arrIdx, currentWid - previousWid);
    let symbol, symbolR;
    if (mParams.ghostNote.symbol) {
      symbol = mParams.ghostNote.symbol.attr("path");
      mParams.ghostNote.symbol.remove();
      mParams.ghostNote.symbol = this.paper.path(symbol);
      mParams.ghostNote.symbol.attr({
        fill: "transparent",
      });
      mParams.ghostNote.symbol.addClass("no-print");
    }
    if (mParams.ghostNote.symbolR) {
      symbolR = mParams.ghostNote.symbolR.attr("path");
      mParams.ghostNote.symbolR.remove();
      mParams.ghostNote.symbolR = this.paper.path(symbolR);
      mParams.ghostNote.symbolR.attr({
        fill: "transparent",
      });
      mParams.ghostNote.symbolR.addClass("no-print");
    }
    if (mParams.ghostNote.symbolDot) {
      mParams.ghostNote.symbolDot.remove();
      mParams.ghostNote.symbolDot = this.paper.circle(-2, -2, 1);
      mParams.ghostNote.symbolDot.attr({
        fill: "transparent",
      });
      mParams.ghostNote.symbolDot.addClass("no-print");
    }
  }

  drawClef(left: number) {
    this.clefObj = this.paper.path(symbols.gClef);
    let porteHeight = this.porteLiHe * 4;
    let scaleFactor = (porteHeight * (74 / 40)) / this.clefObj.getBBox().height;
    let trTop = (porteHeight - this.clefObj.getBBox().height * scaleFactor) / 2;
    let translateStr = "t " + left + " " + trTop;
    let scaleStr = "s" + scaleFactor + " 0 0";

    this.clefObj.transform(translateStr + " " + scaleStr);
    this.clefObj.attr({
      fill: this.mainColor,
    });
    return this.clefObj.getBBox().width + this.porteLiHe;
  }

  drawMeasure() {
    let left = 0;
    this.mainGroup = this.paper.g();
    this.mainGroup.addClass("main-group");
    this.mainGroup.transform("t " + this.startPos + " " + this.porteTop);

    if (this.clefVisible) {
      left += this.drawClef(left);
    }
    if (this.gAcciVisible) {
      left += this.drawAccidentals(left);
    }
    if (this.meterVisible) {
      left += this.drawMeter(left);
    }

    this.notesStartPos = left;

    left += this.drawNotes(left);

    this.drawGuides(this.notesStartPos, left);
    this.drawStaff(left);

    this.mainGroup.add(this.guideGroup);
    this.mainGroup.add(this.staffGroup);

    if (this.clefVisible) {
      this.mainGroup.add(this.clefObj);
    }
    if (this.gAcciVisible) {
      this.mainGroup.add(this.accidentalsGroup);
    }
    if (this.meterVisible) {
      this.mainGroup.add(this.meterGroup);
    }

    this.mainGroup.add(this.notesGroup);
    this.setBoundingBox(this.notesStartPos, left);

    this.lastDrawnWidth = left;

    return left;
  }

  drawAccidentals(left: number) {
    this.accidentalsGroup = this.paper.g();

    for (let i = 0; i < this.mAccArr.length; i++) {
      let note = this.mAccArr[i];
      let notePos = notePositions[note.getNote()];

      let accPath = symbols[note.getAcc()];
      let accSymbol = this.paper.path(accPath);
      let scaleFactor = parseFloat((this.porteLiHe / 3.25).toFixed(2));

      let top = notePos * this.porteLiHe;

      let translateStr = "t " + left + " " + top;
      let scaleStr = "s" + scaleFactor + " 0 0";
      accSymbol.transform(translateStr + " " + scaleStr);
      accSymbol.attr({
        fill: this.mainColor,
      });
      left += accSymbol.getBBox().width + this.porteLiHe / 2;
      this.accidentalsGroup.add(accSymbol);
    }
    return this.accidentalsGroup.getBBox().width + this.porteLiHe;
  }

  drawMeter(left: number) {
    this.meterGroup = this.paper.g();
    this.meterGroup.transform("t " + left + " " + 0);

    let scaleFactor = parseFloat((this.porteLiHe / 2.5).toFixed(2));
    let numElems = ("" + this.meter.num).split("");
    let locLeft = 0;
    let numG = this.paper.g();
    let translateStr, scaleStr;
    for (let n of numElems) {
      let numElem = this.paper.path((symbols.numbers as string[])[parseInt(n)]);
      numG.add(numElem);
      translateStr = "t " + locLeft + " 0";
      scaleStr = "s" + scaleFactor + " 0 0";
      numElem.transform(translateStr + " " + scaleStr);
      numElem.attr({
        fill: this.mainColor,
      });
      locLeft += numElem.getBBox().width;
    }
    translateStr = "t " + 0 + " " + this.lineThickness;
    numG.transform(translateStr);

    let denElems = ("" + this.meter.den).split("");
    let denG = this.paper.g();
    locLeft = 0;
    for (let n of denElems) {
      let denElem = this.paper.path((symbols.numbers as string[])[parseInt(n)]);
      denG.add(denElem);
      translateStr = "t " + locLeft + " 0";
      scaleStr = "s" + scaleFactor + " 0 0";
      denElem.transform(translateStr + " " + scaleStr);
      denElem.attr({
        fill: this.mainColor,
      });
      locLeft += denElem.getBBox().width;
    }
    let offset = (numG.getBBox().width - denG.getBBox().width) / 2;
    translateStr = "t " + offset + " " + (this.porteLiHe * 2 + this.lineThickness);
    denG.transform(translateStr);

    this.meterGroup.add(numG);
    this.meterGroup.add(denG);
    return this.meterGroup.getBBox().width + this.porteLiHe;
  }

  drawNotes(left: number) {
    this.notesGroup = this.paper.g();
    this.notesGroup.addClass("notes-group");
    this.notesGroup.transform("t " + left + " " + 0);
    let color = this.isExceeded() ? this.noteErrColor : this.noteColor;
    let highColor = this.highlightColor;

    if (this.isEmpty()) {
      return this.emptyMeasureWidth;
    }

    let space = this.maxSpace;
    let accidentals = JSON.parse(JSON.stringify(this.mAccJson));
    let leftMargin = space;
    let noteIdx = 0;
    for (let note of this.notes) {
      let acci = this.getReqAccidental(note, accidentals);
      let noteG = note.drawNote(
        this.paper,
        leftMargin,
        0,
        this.porteLineColor,
        acci
      );
      noteG.attr({ fill: color, smn: [this.satirNo, this.arrIdx, noteIdx].join(",") });
      noteG.click(function (e: any) {
        noteGClick(e, noteG, color, highColor, note);
        e.stopPropagation();
      });
      this.notesGroup.add(noteG);
      this.noteLefts.push(this.startPos + left + leftMargin);
      if (note.getHasStepLines()) {
        leftMargin += noteG.getBBox().width + space / 4;
      } else {
        leftMargin += noteG.getBBox().width + space;
      }
      noteIdx += 1;
    }
    if (!this.isFull()) {
      leftMargin += space;
    }
    return leftMargin;
  }

  drawGuides(start: number, end: number) {
    // draw upper & lower guide lines
    let y;
    this.guideGroup = this.paper.g();
    for (let i = 1; i <= 5; i++) {
      y = -i * this.porteLiHe;
      let upperLine = this.paper.line(start, y, end, y);
      this.guideGroup.add(upperLine);

      y = (i + 4) * this.porteLiHe;
      let lowerLine = this.paper.line(start, y, end, y);
      this.guideGroup.add(lowerLine);
    }
    this.guideGroup.attr({
      stroke: "transparent",
      strokeWidth: this.lineThickness,
    });

    this.guideGroup.addClass("no-print");
  }

  drawStaff(width: number) {
    this.staffGroup = this.paper.g();
    this.staffGroup.addClass("staff-group");
    for (let i = 0; i < 5; i++) {
      let line = this.paper.line(0, i * this.porteLiHe, width, i * this.porteLiHe);
      line.attr({
        stroke: this.porteLineColor,
        strokeWidth: this.lineThickness,
      });
      this.staffGroup.add(line);
    }
    // measure ending line
    let meEndLine = this.paper.line(width, 0, width, this.porteLiHe * 4);
    meEndLine.attr({
      stroke: this.porteLineColor,
      strokeWidth: this.lineThickness,
    });
    this.staffGroup.add(meEndLine);
  }

  insertAndDrawAt(pos: number, note: Note) {
    this.notes.splice(pos, 0, note);
    mParams.totalNoteCount += 1;
    this.refreshMeasure();

    if (this.isFull() || this.isExceeded()) {
      let meter = this.getMeter();
      let acci = this.getAccidentalsStr();
      this.parentSatir.requestNewMeasure(this.arrIdx, this.startPos + this.lastDrawnWidth, meter, acci);
    }

    playNote(note);
  }

  isEmpty() {
    return this.notes.length === 0;
  }

  isExceeded() {
    let total = 0;
    for (let note of this.notes) {
      total += note.getDuration();
    }
    return total > this.meter.num / this.meter.den;
  }

  isFull() {
    let total = 0;
    for (let note of this.notes) {
      total += note.getDuration();
    }
    return total === this.meter.num / this.meter.den;
  }

  mouseOver(x: number, y: number) {
    if (!mParams.allowInsert) {
      return;
    }
    let scaleFactor, translateStr, scaleStr, width, height, tTop;
    if (x >= this.box.left && x <= this.box.right && y >= this.box.top && y <= this.box.bottom) {
      switch (mParams.type) {
        case "note":
          this.guideGroup.attr({
            stroke: this.ghostLineColor,
          });

          if (y >= this.allYPos[14] + this.porteLiHe / 4) {
            mParams.ghostNote.symbol.attr({
              fill: this.ghostColor,
            });
            mParams.ghostNote.symbolR.attr({
              fill: "transparent",
            });
          } else {
            mParams.ghostNote.symbol.attr({
              fill: "transparent",
            });
            mParams.ghostNote.symbolR.attr({
              fill: this.ghostColor,
            });
          }

          let snapPos = this.allYPos[0];
          let min = this.porteLiHe * 100;
          for (let yPos of this.allYPos) {
            let diff = Math.abs(y - yPos);
            if (diff < min) {
              snapPos = yPos;
              min = diff;
            }
          }
          scaleFactor = this.porteLiHe / 5;
          translateStr = "t " + (x - this.porteLiHe / 2) + " " + snapPos;
          scaleStr = "s" + scaleFactor + " 0 0";
          mParams.ghostNote.symbol.transform(translateStr + " " + scaleStr);
          mParams.ghostNote.symbolR.transform(translateStr + " " + scaleStr);
          if (mParams.dot) {
            mParams.ghostNote.symbolDot.attr({
              fill: this.ghostColor,
              cx: x - this.porteLiHe / 2 + (this.porteLiHe * 3.5) / 2,
              cy: snapPos,
              r: this.porteLiHe / 5,
            });
          }
          break;
        case "rest":
          scaleFactor = this.porteLiHe / 5;
          scaleStr = "s" + scaleFactor + " 0 0";
          height = mParams.ghostNote.height * scaleFactor;
          switch (mParams.duration) {
            case "1/32":
              tTop = this.porteTop + this.porteLiHe * 4 - height;
              break;
            case "1/16":
              tTop = this.porteTop + this.porteLiHe * 4 - height;
              break;
            case "1/8":
              tTop = this.porteTop + this.porteLiHe * 3 - height;
              break;
            case "1/4":
              tTop = this.porteTop + (this.porteLiHe * 4 - height) / 2;
              break;
            case "1/2":
              tTop = this.porteTop + this.porteLiHe * 2 - height;
              break;
            case "1/1":
              tTop = this.porteTop + this.porteLiHe;
              break;
            default:
              tTop = this.porteTop + (this.porteLiHe * 4 - height) / 2;
              break;
          }
          translateStr = "t " + (x - this.porteLiHe / 2) + " " + tTop;
          mParams.ghostNote.symbol.transform(translateStr + " " + scaleStr);

          mParams.ghostNote.symbol.attr({
            fill: this.ghostColor,
          });
          break;
        case "loc":
          scaleFactor = this.porteLiHe / 4.75;
          scaleStr = "s" + scaleFactor + " 0 0";

          switch (mParams.loc) {
            case "repL":
              scaleFactor = this.porteLiHe / 4.75;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop + (this.porteLiHe * 4 - height) / 2;
              translateStr = "t " + this.startPos + " " + tTop;
              break;
            case "repR":
              scaleFactor = this.porteLiHe / 4.75;
              scaleStr = "s" + scaleFactor + " 0 0";
              scaleFactor = this.porteLiHe / 4.75;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop + (this.porteLiHe * 4 - height) / 2;
              translateStr = "t " + (this.endPos - width) + " " + tTop;
              break;
            case "volta1":
              scaleFactor = this.porteLiHe / 8;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop - height - this.lineThickness * 2;
              translateStr = "t " + this.startPos + " " + tTop;
              break;
            case "volta2":
              scaleFactor = this.porteLiHe / 8;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop - height - this.lineThickness * 2;
              translateStr = "t " + this.startPos + " " + tTop;
              break;
            case "segno":
              scaleFactor = this.porteLiHe / 8;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop - height - this.lineThickness * 2;
              if (x - this.startPos < this.endPos - x) {
                translateStr = "t " + this.startPos + " " + tTop;
              } else {
                translateStr = "t " + (this.endPos - width) + " " + tTop;
              }
              break;
            case "fin":
              scaleFactor = this.porteLiHe / 4.75;
              scaleStr = "s" + scaleFactor + " 0 0";
              scaleFactor = this.porteLiHe / 4.75;
              scaleStr = "s" + scaleFactor + " 0 0";
              height = mParams.ghostNote.height * scaleFactor;
              width = mParams.ghostNote.width * scaleFactor;
              tTop = this.porteTop + (this.porteLiHe * 4 - height) / 2;
              translateStr = "t " + (this.endPos - width) + " " + tTop;
              break;
            default:
              break;
          }

          mParams.ghostNote.symbol.transform(translateStr + " " + scaleStr);
          mParams.ghostNote.symbol.attr({
            fill: this.ghostColor,
          });
          break;
        default:
          break;
      }
      this.ghostsVisible = true;
    } else {
      if (this.ghostsVisible) {
        mParams.ghostNote.symbol.attr({
          fill: "transparent",
        });
        if (mParams.type === "note") {
          this.guideGroup.attr({
            stroke: "transparent",
          });
          mParams.ghostNote.symbolR.attr({
            fill: "transparent",
          });
          if (mParams.dot) {
            mParams.ghostNote.symbolDot.attr({
              fill: "transparent",
              cx: -1,
              cy: -1,
            });
          }
        }
        this.ghostsVisible = false;
      }
    }
  }

  mouseClick(x: number, y: number) {
    if (!mParams.allowInsert) {
      return;
    }
    if (x >= this.box.left && x <= this.box.right && y >= this.box.top && y <= this.box.bottom) {
      let i, note;
      switch (mParams.type) {
        case "note":
          let snapPos = this.allYPos[0];
          let min = this.porteLiHe * 100;
          for (let i = 0; i < this.allYPos.length; i++) {
            let diff = Math.abs(y - this.allYPos[i]);
            if (diff < min) {
              snapPos = i;
              min = diff;
            }
          }
          snapPos = (snapPos - 10) / 2;
          let noteRoot = notePositionsRev[snapPos + ""];
          let noteAcci = mParams.acci ? mParams.acci : "";
          let isDotted = mParams.dot;
          let durDen = parseInt(mParams.duration!.replace("n", ""));
          let durNum = isDotted ? 3 : 1;
          durDen = isDotted ? durDen * 2 : durDen;
          let fullDur = durNum + "/" + durDen;
          i = 0;
          for (let nl of this.noteLefts) {
            if (nl < x) {
              i++;
            } else {
              break;
            }
          }
          let cAcci = this.getReqAccidentalAtPos(noteRoot, noteAcci, i);
          cAcci = cAcci.replace("d", "#");
          let fullPitch = noteRoot + cAcci;
          note = new Note(fullPitch, fullDur);
          this.insertAndDrawAt(i, note);
          break;
        case "rest":
          let restBody = "Rest";
          let restDur = mParams.duration!;
          i = 0;
          for (let nl of this.noteLefts) {
            if (nl < x) {
              i++;
            } else {
              break;
            }
          }
          note = new Note(restBody, restDur);
          this.insertAndDrawAt(i, note);
          break;
        default:
          break;
      }
    }
  }

  shiftPosition(offset: number) {
    this.startPos += offset;
    this.mainGroup.transform("t " + this.startPos + " " + this.porteTop);
  }

  updateColorScheme(colorScheme: { [key: string]: string; }) {
    this.mainColor = colorScheme.mainColor;
    this.ghostColor = colorScheme.ghostColor;
    this.ghostLineColor = colorScheme.ghostLineColor;
    this.highColor = colorScheme.highColor;
    this.mainColor = colorScheme.mainColor;
    this.noteColor = colorScheme.noteColor;
    this.noteErrColor = colorScheme.noteErrColor;
    this.porteLineColor = colorScheme.porteLineColor;

    if (this.clefObj) {
      this.clefObj.attr({
        fill: this.mainColor
      });
    }

  }

}

export default Measure;