import { mParams } from "./mparams";
import { symbols } from "../constants";
import { Measure } from "./Measure";
import { SatirObject } from "./SatirObject";
import { setMakam, setUsul, playWhole, allowNewInsertion } from "./utils";

const Snap = require("snapsvg-cjs");

export function TmmScore(containerSelector) {
  this.configs = {
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    lineThickness: 1,
    porteLineHeight: 10,
    highColor: "#46879E",
    noteColor: "#243041",
    noteErrColor: "#9B1800",
    mainColor: "#565345",
    porteLineColor: "#BDA37E",
    paperBgColor: "#F7F5EA",
    ghostColor: "#998166",
    ghostLineColor: "#E5DCD0",
    maxPaperWidth: 1100,
    emptyMeasureLen: 4,
    emptyMeasureWidth: 0,
  };
  let porLiHe = this.configs.porteLineHeight;
  this.configs.emptyMeasureWidth = this.configs.emptyMeasureLen * porLiHe * 1.5;
  // prep work

  const parentElem = document.querySelector(containerSelector);
  let scorePaperWidth = parentElem.clientWidth;

  this.svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let svgID = "svg-tmm-score";
  this.svgElem.setAttribute("id", svgID);
  this.svgElem.setAttribute("class", "shadowed-porte");
  this.svgElem.style.backgroundColor = this.configs.paperBgColor;
  this.svgElem.style.width = scorePaperWidth + "px";

  parentElem.append(this.svgElem);
  this.paper = Snap("#" + svgID);

  allowNewInsertion(true);
  // eof prep work

  let pLeft = this.configs.padding.left;
  let pRight = this.configs.padding.right;
  let pTop = this.configs.padding.top;
  let pBot = this.configs.padding.bottom;
  let satirWidth = scorePaperWidth - pLeft - pRight;
  let numOfReqLines = 1;
  let satirNo = 0;
  let offsetTop = pTop + 6 * porLiHe;

  this.changeScoreMakamAndMeter = function (makam, accidentals, usul, meter) {
    for (let satir of this.satirlar) {
      satir.changeMakamAndMeter(makam, accidentals, usul, meter);
    }
  };

  this.initScore = function () {
    let meter = [9, 8],
      usul = "Aksak",
      tempo = 124,
      accidentals = ["Si4b4", "Fa5#4", "Do5#4"],
      makam = "Hicaz";

    setMakam(makam, accidentals);
    setUsul(usul, meter, tempo);

    this.satirlar = [];

    let satir = new SatirObject(satirNo, this.paper, this.configs, pLeft, offsetTop, satirWidth, this);
    let measure = new Measure(meter, accidentals);
    satir.addMeasure(measure);

    this.satirlar.push(satir);

    this.svgElem.style.height = pTop + pBot + numOfReqLines * 17 * porLiHe + "px";

    for (let satir of this.satirlar) {
      satir.drawSatir();
    }
  };

  this.getWholePlayableObject = function () {
    let allMeasures = [];
    for (let satir of this.satirlar) {
      allMeasures = allMeasures.concat(satir.getMeasures());
    }
    let song = [];
    for (let measure of allMeasures) {
      song = song.concat(measure.getNotes());
    }
    return song;
  };

  this.attachEventHandlers = function () {
    let that = this;
    let pt = that.svgElem.createSVGPoint();
    that.svgElem.addEventListener(
      "mousemove",
      function (evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        let loc = pt.matrixTransform(that.svgElem.getScreenCTM().inverse());
        let x = Math.max(Math.round(loc.x), 0);
        let y = Math.max(Math.round(loc.y), 0);

        for (let satir of that.satirlar) {
          satir.handleMouse(x, y);
        }
      },
      false
    );

    that.svgElem.addEventListener(
      "mouseleave",
      function () {
        for (let satir of that.satirlar) {
          satir.handleMouse(-1, -1);
        }
      },
      false
    );

    that.svgElem.addEventListener(
      "dragover",
      function (evt) {
        evt.preventDefault();
      },
      false
    );

    that.svgElem.addEventListener(
      "drop",
      function (evt) {
        evt.preventDefault();
        const dropData = evt.dataTransfer.getData("text");
        evt.dataTransfer.clearData();
        console.log("drop", dropData);
      },
      false
    );

    that.svgElem.addEventListener(
      "click",
      function (evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        let loc = pt.matrixTransform(that.svgElem.getScreenCTM().inverse());
        let x = Math.max(Math.round(loc.x), 0);
        let y = Math.max(Math.round(loc.y), 0);

        for (let satir of that.satirlar) {
          satir.handleClick(x, y);
        }
      },
      false
    );

    document.addEventListener("keydown", function (evt) {
      if (mParams.highElem && (evt.key === "Delete" || evt.key === "Backspace")) {
        let smn = mParams.highElem.attr("smn").split(",");
        that.satirlar[smn[0]].deleteSatirNote(smn[1], smn[2]);
      }
    });
  };

  this.begin = function () {
    this.initScore();
    this.attachEventHandlers();
    // deactivate rest
    mParams.rest = null;
    // deactivate loc
    mParams.loc = null;
    mParams.type = "note";
    mParams.duration = "n8";

    if (mParams.ghostNote.symbol) {
      mParams.ghostNote.symbol.remove();
    }
    if (mParams.ghostNote.symbolR) {
      mParams.ghostNote.symbolR.remove();
    }

    mParams.ghostNote.symbol = this.paper.path(symbols[mParams.duration]);
    mParams.ghostNote.symbolR = this.paper.path(symbols[mParams.duration + "r"]);
    mParams.ghostNote.symbol.attr({
      fill: "transparent",
    });
    mParams.ghostNote.symbolR.attr({
      fill: "transparent",
    });
    mParams.ghostNote.symbol.addClass("no-print");
    mParams.ghostNote.symbolR.addClass("no-print");
    mParams.ghostNote.width = mParams.ghostNote.symbol.getBBox().width;
    mParams.ghostNote.height = mParams.ghostNote.symbol.getBBox().height;
  };

  this.setInstrument = function (instrument) {
    mParams.instrument = instrument;
    mParams.canUseSound = true;
  };

  this.toggleSound = function (isSoundActive) {
    mParams.soundActive = isSoundActive;
  };

  this.togglePlay = function (isPlaying) {
    if (isPlaying && mParams.canUseSound && mParams.soundActive) {
      playWhole(this.getWholePlayableObject(), this.songEndedCallback);
    }
  };

  this.songEndedCallback = null;

  this.setSongEndedHandler = function (callback) {
    this.songEndedCallback = callback;
  };

  this.setAccidental = function (accidental) {
    // deactivate rest
    mParams.rest = null;
    if (mParams.type === "rest") {
      mParams.type = null;
    }
    // deactivate loc
    mParams.loc = null;
    // activate acc
    mParams.acci = accidental;
  };

  this.setDuration = function (duration) {
    // deactivate rest
    mParams.rest = null;
    // deactivate loc
    mParams.loc = null;
    // activate dur

    mParams.type = "note";
    mParams.duration = duration;

    if (mParams.ghostNote.symbol) {
      mParams.ghostNote.symbol.remove();
    }
    if (mParams.ghostNote.symbolR) {
      mParams.ghostNote.symbolR.remove();
    }

    mParams.ghostNote.symbol = this.paper.path(symbols[mParams.duration]);
    mParams.ghostNote.symbolR = this.paper.path(symbols[mParams.duration + "r"]);
    mParams.ghostNote.symbol.attr({
      fill: "transparent",
    });
    mParams.ghostNote.symbolR.attr({
      fill: "transparent",
    });
    mParams.ghostNote.symbol.addClass("no-print");
    mParams.ghostNote.symbolR.addClass("no-print");
    mParams.ghostNote.width = mParams.ghostNote.symbol.getBBox().width;
    mParams.ghostNote.height = mParams.ghostNote.symbol.getBBox().height;
  };

  this.setIsDotted = function (isDotted) {
    if (!mParams.duration || mParams.rest) {
      return;
    }
    mParams.dot = isDotted;
    if (!mParams.ghostNote.symbolDot) {
      mParams.ghostNote.symbolDot = this.paper.circle(-2, -2, 1);
      mParams.ghostNote.symbolDot.attr({
        fill: "transparent",
      });
    }
  };

  this.setRest = function (restVal, durVal) {
    // deactivate acci
    mParams.acci = null;
    // deactivate dur
    mParams.duration = null;
    // deactivate dot
    mParams.dot = false;
    // deactivate loc
    mParams.loc = null;
    // activate rest

    mParams.type = "rest";
    mParams.rest = restVal;
    mParams.duration = durVal;

    if (mParams.ghostNote.symbol) {
      mParams.ghostNote.symbol.remove();
    }
    if (mParams.ghostNote.symbolR) {
      mParams.ghostNote.symbolR.remove();
    }
    mParams.ghostNote.symbol = this.paper.path(symbols[mParams.rest]);
    mParams.ghostNote.symbol.attr({
      fill: "transparent",
    });
    mParams.ghostNote.symbol.addClass("no-print");
    mParams.ghostNote.width = mParams.ghostNote.symbol.getBBox().width;
    mParams.ghostNote.height = mParams.ghostNote.symbol.getBBox().height;
  };
}
