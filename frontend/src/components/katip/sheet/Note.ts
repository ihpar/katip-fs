import { notePositions, symbols } from "../constants";

class Note {
  noteRoot: string;
  noteOctave: number;
  noteComma: string;
  durStr: string;
  origDurStr: string;
  origPitchStr: string;
  durParts: string[];
  durNum: number;
  durDen: number;
  safeDurStr: string;
  isDotted: boolean;
  isRest: boolean;
  hasStepLines: boolean;

  constructor(pitch: string, duration: string) {
    this.noteRoot = "";
    this.noteOctave = 0;
    this.noteComma = "";
    this.durStr = duration;
    this.origDurStr = duration;
    this.origPitchStr = pitch;
    this.durParts = this.durStr.split("/");
    this.durNum = parseInt(this.durParts[0]);
    this.durDen = parseInt(this.durParts[1]);
    this.safeDurStr = this.durNum + "-" + this.durDen;
    this.isDotted = this.durNum === 3;
    this.isRest = pitch.toLowerCase() === "rest";
    this.hasStepLines = false;
    this.configue();
  }

  private configue() {
    if (this.isDotted) {
      this.durNum = 1;
      this.durDen = this.durDen / 2;
      this.durStr = this.durNum + "/" + this.durDen;
    }

    if (this.origPitchStr.includes("#") || this.origPitchStr.includes("b")) {
      this.noteComma = this.origPitchStr.substr(-2);
    }

    this.noteRoot = this.origPitchStr.replace(this.noteComma, "");

    if (!this.isRest) {
      this.noteOctave = parseInt(this.noteRoot.substr(-1));
      this.noteRoot = this.noteRoot.slice(0, -1).toLowerCase();
      if (this.noteComma) {
        this.noteComma = this.noteComma.replace("#", "d");
      }
    } else {
      this.noteRoot = "rest";
    }
  }

  getAcc() {
    return this.noteComma;
  }

  getDuration() {
    if (this.isDotted) {
      return 3 / (2 * this.durDen);
    }
    return this.durNum / this.durDen;
  }

  getHasStepLines() {
    return this.hasStepLines;
  }

  getNote() {
    if (this.isRest) {
      return this.noteRoot;
    }
    return this.noteRoot + this.noteOctave;
  }

  getPathStr(durStr: string) {
    let path;
    if (!this.isRest) {
      let isUpsideDown = notePositions[this.getNote()] <= 2;
      switch (durStr) {
        case "1/32":
          if (isUpsideDown) {
            path = symbols.n32r;
          } else {
            path = symbols.n32;
          }
          break;
        case "1/16":
          if (isUpsideDown) {
            path = symbols.n16r;
          } else {
            path = symbols.n16;
          }
          break;
        case "1/8":
          if (isUpsideDown) {
            path = symbols.n8r;
          } else {
            path = symbols.n8;
          }
          break;
        case "1/4":
          if (isUpsideDown) {
            path = symbols.n4r;
          } else {
            path = symbols.n4;
          }
          break;
        case "1/2":
          if (isUpsideDown) {
            path = symbols.n2r;
          } else {
            path = symbols.n2;
          }
          break;
        case "1/1":
          path = symbols.n1;
          break;
        default:
          path = symbols.n4;
          break;
      }
    } else {
      switch (durStr) {
        case "1/32":
          path = symbols.r32;
          break;
        case "1/16":
          path = symbols.r16;
          break;
        case "1/8":
          path = symbols.r8;
          break;
        case "1/4":
          path = symbols.r4;
          break;
        case "1/2":
          path = symbols.r2;
          break;
        case "1/1":
          path = symbols.r1;
          break;
        default:
          path = symbols.r4;
          break;
      }
    }
    return path;
  }

  drawNote(paper: any, left: number, top: number, lColor: string, acci: string) {
    let portePos = 0;
    let noteG = paper.g();
    let path = this.getPathStr(this.durStr);
    let absLeft = Math.round(left * 100) / 100,
      relLeft = 0;
    if (!this.isRest) {
      portePos = notePositions[this.getNote()];
      let absTop = top + 10 * portePos;
      absTop = Math.round(absTop * 100) / 100;
      let accSymbol = null;
      let stepLines = [];

      if (acci) {
        let accPath = symbols[acci];
        accSymbol = paper.path(accPath);
        let scaleFactor = 3.65;
        accSymbol.transform(`t ${relLeft} 0 s ${scaleFactor} 0 0`);
        relLeft += accSymbol.getBBox().width + 2.5;
      }

      if (portePos <= -1) {
        // higher than A5
        let stepCount = Math.floor(Math.abs(portePos));
        for (let i = 0; i < stepCount; i++) {
          let lineTop = (i - (portePos % 1)) * 10;
          let stepLine = paper.line(relLeft - 4, lineTop, relLeft + 15, lineTop);
          stepLine.attr({
            stroke: lColor,
            strokeWidth: 1,
          });
          stepLines.push(stepLine);
        }
      }
      if (portePos >= 5) {
        // lower than C4
        let stepCount = Math.floor(portePos - 4);
        for (let i = 0; i < stepCount; i++) {
          let lineTop = (-i - (portePos % 1)) * 10;
          let stepLine = paper.line(relLeft - 5, lineTop, relLeft + 17.5, lineTop);
          stepLine.attr({
            stroke: lColor,
            strokeWidth: 1,
          });
          stepLines.push(stepLine);
        }
      }

      let bodyRect = paper.rect(relLeft, 0 - 5, 12, 10);
      bodyRect.attr({ fill: "transparent" });
      noteG.add(bodyRect);

      let noteBody = paper.path(path);
      let translateStr = "t " + relLeft + " " + 0;
      let scaleFactor = 2;
      let scaleStr = "s" + scaleFactor + " 0 0";

      noteBody.transform(translateStr + " " + scaleStr);
      if (stepLines.length) {
        this.hasStepLines = true;
      }

      for (let sl of stepLines) {
        noteG.add(sl);
      }

      if (accSymbol) {
        noteG.add(accSymbol);
      }

      noteG.add(noteBody);

      if (this.isDotted) {
        let dot = paper.circle(relLeft + 17.5, 0, 2);
        noteG.add(dot);
      }
      translateStr = "t " + absLeft + " " + absTop;
      noteG.transform(translateStr);
    } else {
      let restBody = paper.path(path);

      let scaleFactor = 2;
      let scaleStr = "s" + scaleFactor + " 0 0";
      let height = restBody.getBBox().height * scaleFactor;
      let tTop;
      switch (this.durStr) {
        case "1/32":
          tTop = top + 40 - height;
          break;
        case "1/16":
          tTop = top + 40 - height;
          break;
        case "1/8":
          tTop = top + 30 - height;
          break;
        case "1/4":
          tTop = top + (40 - height) / 2;
          break;
        case "1/2":
          tTop = top + 20 - height;
          break;
        case "1/1":
          tTop = top + 10;
          break;
        default:
          tTop = top + (40 - height) / 2;
          break;
      }

      let translateStr = "t " + left + " " + tTop;

      restBody.transform(scaleStr);

      noteG.add(restBody);
      noteG.transform(translateStr);
    }
    return noteG;
  }

  toNoteStr(includeAcc: boolean, includeDur: boolean) {
    let res = this.getNote();
    if (includeAcc) {
      res = this.origPitchStr;
    }
    if (includeDur) {
      // res += ':' + this.origDurStr;
      res += ":" + this.safeDurStr;
    }
    return res;
  }

}

export default Note;