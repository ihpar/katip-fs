import { mParams } from "./mparams";
import { symbols, ALL_MAKAMS, ALL_USULS } from "./constants";
import Measure from "./Measure";
import SatirObject from "./SatirObject";
import { setMakam, setUsul, playWhole, allowNewInsertion } from "./utils";
import { Theme } from "../../../store/slices/theme";

const Snap = require("snapsvg-cjs");

class TmmScore {
  private lightTheme = {
    highColor: "#46879E",
    noteColor: "#243041",
    noteErrColor: "#9B1800",
    mainColor: "#565345",
    porteLineColor: "#BDA37E",
    ghostColor: "#998166",
    ghostLineColor: "#E5DCD0",
  };

  private darkTheme = {
    highColor: "#389edb",
    noteColor: "#00cdb2",
    noteErrColor: "#ff5f57",
    mainColor: "#8fb2c7",
    porteLineColor: "#698a96",
    ghostColor: "#288a7d",
    ghostLineColor: "#4d5a5e",
  };

  private configs = {
    maxPaperWidth: 1100,
    emptyMeasureLen: 4,
    emptyMeasureWidth: 60,
    themeCode: "",
    colorScheme: {},
  };

  private containerSelector: string;
  private svgElem: SVGSVGElement;
  private readonly svgId = "svg-tmm-score";
  private paper: any;
  private songEndedHandler: () => void;
  private satirlar: SatirObject[];
  private scorePaperWidth: number;

  // Configuration section
  constructor(containerSelector: string, themeCode = Theme.Light) {
    this.containerSelector = containerSelector;
    this.configs.themeCode = themeCode;
    this.svgElem = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.satirlar = [];
    this.scorePaperWidth = 0;
    this.songEndedHandler = () => {};
    this.configure();
  }

  private configure() {
    const parentElem = document.querySelector(this.containerSelector);
    this.scorePaperWidth = parentElem?.clientWidth || 0;

    this.svgElem.setAttribute("id", this.svgId);
    this.svgElem.style.width = this.scorePaperWidth + "px";

    parentElem?.append(this.svgElem);
    this.paper = Snap("#" + this.svgId);

    if (this.configs.themeCode === Theme.Light) {
      this.configs.colorScheme = this.lightTheme;
    } else {
      this.configs.colorScheme = this.darkTheme;
    }
  }

  private init() {
    const meter = [9, 8],
      usul = "Aksak",
      tempo = 124,
      accidentals = ["Si4b4", "Fa5#4", "Do5#4"],
      makam = "Hicaz";

    setMakam(makam, accidentals);
    setUsul(usul, meter, tempo);

    const satir = new SatirObject(
      0,
      this.paper,
      this.configs,
      0,
      60,
      this.scorePaperWidth,
      this
    );
    const measure = new Measure(meter, accidentals);
    satir.addMeasure(measure);

    this.satirlar.push(satir);

    this.svgElem.style.height = 1 * 170 + "px";

    for (let satir of this.satirlar) {
      satir.drawSatir();
    }
  }

  setSongEndedHandler(songEndedHandler: () => void) {
    this.songEndedHandler = songEndedHandler;
  }

  setInstrument(instrument: any) {
    mParams.instrument = instrument;
    mParams.canUseSound = true;
  }

  changeTheme(themeCode: string) {
    this.configs.themeCode = themeCode;
    if (this.configs.themeCode === Theme.Light) {
      this.configs.colorScheme = this.lightTheme;
    } else {
      this.configs.colorScheme = this.darkTheme;
    }

    for (let satir of this.satirlar) {
      satir.updateColorScheme(this.configs.colorScheme);
    }
  }

  private attachEventHandlers() {
    let that = this;
    let pt = that.svgElem.createSVGPoint();
    that.svgElem.addEventListener(
      "mousemove",
      function (evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        let loc = pt.matrixTransform(that.svgElem.getScreenCTM()?.inverse());
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
        const dropData = evt.dataTransfer!.getData("text");
        const parts = dropData.split(":");

        if (parts[0] === "makam") {
          const droppedMakamId = parts[1];
          const droppedMakam = ALL_MAKAMS.find(
            (makam) => makam.id === droppedMakamId
          )!;
          setMakam(droppedMakam.name, droppedMakam.accidentals);
        } else if (parts[0] === "usul") {
          const droppedUsulId = parts[1];
          const droppedUsul = ALL_USULS.find(
            (usul) => usul.id === droppedUsulId
          )!;
          setUsul(
            droppedUsul.name,
            [droppedUsul.numerator, droppedUsul.denominator],
            mParams.usul.tempo
          );
        }

        that.changeScoreMakamAndMeter(
          mParams.makam.name,
          mParams.makam.accidentals,
          mParams.usul.name,
          mParams.usul.meter
        );
        evt.dataTransfer?.clearData();
      },
      false
    );

    that.svgElem.addEventListener(
      "click",
      function (evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        let loc = pt.matrixTransform(that.svgElem.getScreenCTM()?.inverse());
        let x = Math.max(Math.round(loc.x), 0);
        let y = Math.max(Math.round(loc.y), 0);

        for (let satir of that.satirlar) {
          satir.handleClick(x, y);
        }
      },
      false
    );

    document.addEventListener("keydown", function (evt) {
      if (
        mParams.highElem &&
        (evt.key === "Delete" || evt.key === "Backspace")
      ) {
        let smn = mParams.highElem.attr("smn").split(",");
        that.satirlar[smn[0]].deleteSatirNote(smn[1], smn[2]);
      }
    });
  }

  private setInitialMParams() {
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
    mParams.ghostNote.symbolR = this.paper.path(
      symbols[mParams.duration + "r"]
    );
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
  }
  // EOF Configuration section

  // Player section
  toggleSound(isSoundOn: boolean) {
    mParams.soundActive = isSoundOn;
  }

  togglePlay(isPlaying: boolean) {
    if (isPlaying && mParams.canUseSound && mParams.soundActive) {
      playWhole(this.getWholePlayableObject(), this.songEndedHandler);
    }
  }
  // EOF Player section

  // Element insertion section
  setAccidental(accidental: string | null) {
    // deactivate rest
    mParams.rest = null;
    if (mParams.type === "rest") {
      mParams.type = null;
    }
    // deactivate loc
    mParams.loc = null;
    // activate acc
    mParams.acci = accidental;
  }

  setDuration(duration: string) {
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
    mParams.ghostNote.symbolR = this.paper.path(
      symbols[mParams.duration + "r"]
    );
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
  }

  setIsDotted(isDotted: boolean) {
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
  }

  setRest(value: string, duration: string) {
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
    mParams.rest = value;
    mParams.duration = duration;

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
  }
  // EOF Element insertion section

  // Major methods section
  // TODO: fix any types
  changeScoreMakamAndMeter(
    makam: any,
    accidentals: any,
    usul: any,
    meter: any
  ) {
    for (let satir of this.satirlar) {
      satir.changeMakamAndMeter(makam, accidentals, usul, meter);
    }
  }

  // TODO: fix any types
  private getWholePlayableObject() {
    let allMeasures: any[] = [];
    for (let satir of this.satirlar) {
      allMeasures = allMeasures.concat(satir.getMeasures());
    }
    let song: any[] = [];
    for (let measure of allMeasures) {
      song = song.concat(measure.getNotes());
    }
    return song;
  }
  // EOF Major methods section

  begin() {
    this.init();
    this.attachEventHandlers();
    this.setInitialMParams();

    allowNewInsertion(true);
  }
}

export default TmmScore;
