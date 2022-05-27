import { notePositions, symbols } from "../constants";

export function Note(pitch, duration) {
  this.noteRoot = "";
  this.noteOctave = 0;
  this.noteComma = "";
  this.durStr = duration;
  this.origDurStr = duration;
  this.origPitchStr = pitch;
  let durParts = this.durStr.split("/");
  this.durNum = parseInt(durParts[0]);
  this.durDen = parseInt(durParts[1]);
  this.safeDurStr = this.durNum + "-" + this.durDen;
  this.isDotted = this.durNum === 3;
  this.isRest = pitch.toLowerCase() === "rest";
  this.hasStepLines = false;

  if (this.isDotted) {
    this.durNum = 1;
    this.durDen = this.durDen / 2;
    this.durStr = this.durNum + "/" + this.durDen;
  }

  if (pitch.includes("#") || pitch.includes("b")) {
    this.noteComma = pitch.substr(-2);
  }

  this.noteRoot = pitch.replace(this.noteComma, "");

  if (!this.isRest) {
    this.noteOctave = parseInt(this.noteRoot.substr(-1));
    this.noteRoot = this.noteRoot.slice(0, -1).toLowerCase();
    if (this.noteComma) {
      this.noteComma = this.noteComma.replace("#", "d");
    }
  } else {
    this.noteRoot = "rest";
  }

  // getters
  this.getAcc = function () {
    return this.noteComma;
  };

  this.getDuration = function () {
    if (this.isDotted) {
      return 3 / (2 * this.durDen);
    }
    return this.durNum / this.durDen;
  };

  this.getHasStepLines = function () {
    return this.hasStepLines;
  };

  this.getNote = function () {
    if (this.isRest) {
      return this.noteRoot;
    }
    return this.noteRoot + this.noteOctave;
  };

  this.getPathStr = function (durStr) {
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
  };

  // methods
  this.drawNote = function (paper, porteLiHe, lThickness, left, top, lColor, acci) {
    let portePos = 0;
    let noteG = paper.g();
    let path = this.getPathStr(this.durStr);
    let absLeft = Math.round(left * 100) / 100,
      relLeft = 0;
    if (!this.isRest) {
      portePos = notePositions[this.getNote()];
      let absTop = top + porteLiHe * portePos;
      absTop = Math.round(absTop * 100) / 100;
      let accSymbol = null;
      let stepLines = [];

      if (acci) {
        let accPath = symbols[acci];
        accSymbol = paper.path(accPath);
        let scaleFactor = parseFloat((porteLiHe / 2.75).toFixed(2));
        accSymbol.transform(`t ${relLeft} 0 s ${scaleFactor} 0 0`);
        relLeft += accSymbol.getBBox().width + porteLiHe / 4;
      }

      if (portePos <= -1) {
        // higher than A5
        let stepCount = Math.floor(Math.abs(portePos));
        for (let i = 0; i < stepCount; i++) {
          let lineTop = (i - (portePos % 1)) * porteLiHe;
          let stepLine = paper.line(relLeft - porteLiHe / 2.5, lineTop, relLeft + (porteLiHe * 3) / 2, lineTop);
          stepLine.attr({
            stroke: lColor,
            strokeWidth: lThickness,
          });
          stepLines.push(stepLine);
        }
      }
      if (portePos >= 5) {
        // lower than C4
        let stepCount = Math.floor(portePos - 4);
        for (let i = 0; i < stepCount; i++) {
          let lineTop = (-i - (portePos % 1)) * porteLiHe;
          let stepLine = paper.line(relLeft - porteLiHe / 2, lineTop, relLeft + (porteLiHe * 3.5) / 2, lineTop);
          stepLine.attr({
            stroke: lColor,
            strokeWidth: lThickness,
          });
          stepLines.push(stepLine);
        }
      }

      let bodyRect = paper.rect(relLeft, 0 - porteLiHe / 2, porteLiHe * 1.2, porteLiHe);
      bodyRect.attr({ fill: "transparent" });
      noteG.add(bodyRect);

      let noteBody = paper.path(path);
      let translateStr = "t " + relLeft + " " + 0;
      let scaleFactor = porteLiHe / 5;
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
        let dot = paper.circle(relLeft + (porteLiHe * 3.5) / 2, 0, porteLiHe / 5);
        noteG.add(dot);
      }
      translateStr = "t " + absLeft + " " + absTop;
      noteG.transform(translateStr);
    } else {
      let restBody = paper.path(path);

      let scaleFactor = porteLiHe / 5;
      let scaleStr = "s" + scaleFactor + " 0 0";
      let height = restBody.getBBox().height * scaleFactor;
      let tTop;
      switch (this.durStr) {
        case "1/32":
          tTop = top + porteLiHe * 4 - height;
          break;
        case "1/16":
          tTop = top + porteLiHe * 4 - height;
          break;
        case "1/8":
          tTop = top + porteLiHe * 3 - height;
          break;
        case "1/4":
          tTop = top + (porteLiHe * 4 - height) / 2;
          break;
        case "1/2":
          tTop = top + porteLiHe * 2 - height;
          break;
        case "1/1":
          tTop = top + porteLiHe;
          break;
        default:
          tTop = top + (porteLiHe * 4 - height) / 2;
          break;
      }

      let translateStr = "t " + left + " " + tTop;

      restBody.transform(scaleStr);

      noteG.add(restBody);
      noteG.transform(translateStr);
    }
    return noteG;
  };

  this.toNoteStr = function (includeAcc, includeDur) {
    let res = this.getNote();
    if (includeAcc) {
      res = this.origPitchStr;
    }
    if (includeDur) {
      // res += ':' + this.origDurStr;
      res += ":" + this.safeDurStr;
    }
    return res;
  };
}
