import { FontLoader } from "./fonts/FontLoader";
import { BravuraFont } from "./fonts/bravura";
import { Theme } from "store/slices/theme";
import Page from "./Page";

export interface ColorScheme {
  highColor: string,
  noteColor: string,
  noteErrColor: string,
  mainColor: string,
  porteLineColor: string,
  ghostColor: string,
  ghostLineColor: string,
}

export default class Score {
  readonly width = 836;
  readonly height = 1202;
  fontLoader: FontLoader;

  pages: Page[];

  colorSchemes = {
    [Theme.Light]: {
      highColor: "#46879E",
      noteColor: "#243041",
      noteErrColor: "#9B1800",
      mainColor: "#565345",
      porteLineColor: "#BDA37E",
      ghostColor: "#998166",
      ghostLineColor: "#E5DCD0",
    },
    [Theme.Dark]: {
      highColor: "#389edb",
      noteColor: "#38c9a9",
      noteErrColor: "#ff5f57",
      mainColor: "#8fb2c7",
      porteLineColor: "#698a96",
      ghostColor: "#288a7d",
      ghostLineColor: "#4d5a5e",
    },
  };

  activeColorScheme: ColorScheme;

  constructor(scoreRootId: string, numPages = 1) {
    this.fontLoader = new FontLoader(BravuraFont);
    this.activeColorScheme = this.colorSchemes[Theme.Light];

    this.pages = [];
    for (let i = 0; i < numPages; i++) {
      this.pages.push(new Page(
        scoreRootId,
        i,
        this.width,
        this.height,
        this.activeColorScheme,
        this.fontLoader
      ));
    }
  }

  setTheme(theme: Theme) {
    if (theme === Theme.Dark) {
      this.activeColorScheme = this.colorSchemes[Theme.Dark];
    } else {
      this.activeColorScheme = this.colorSchemes[Theme.Light];
    }

    for (let page of this.pages) {
      page.setColorScheme(this.activeColorScheme);
    }
  }

  drawTests() {

    /*
        const symbols = this.fontLoader;
        const painter = this.painter;
        painter.clear();
    
        let staff = new Staff(0, this.width, this.painter, this.fontLoader, this.activeColorScheme, true);
        staff.render();
    
        const mainColor = this.activeColorScheme.mainColor;
        const noteColor = this.activeColorScheme.noteColor;
    
        // time sig
        painter.path(symbols.getPath("timeSig9")).move(40, 54 + 1).fill(mainColor);
        painter.path(symbols.getPath("timeSig8")).move(40, 72 + 1).fill(mainColor);
    
        // acci
        let noteLeft = 70;
    
        // accidentals
        painter.path(symbols.getPath("accidentalNatural")).move(noteLeft, 75).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalDoubleSharp")).move(noteLeft, 76.5).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalDoubleFlat")).move(noteLeft, 61).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalBuyukMucennebFlat")).move(noteLeft, 56.5).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalKucukMucennebFlat")).move(noteLeft, 52).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalBakiyeFlat")).move(noteLeft, 47.5).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalKomaFlat")).move(noteLeft, 43).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalKomaSharp")).move(noteLeft, 43.5).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalBakiyeSharp")).move(noteLeft, 48).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalKucukMucennebSharp")).move(noteLeft, 52.5).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("accidentalBuyukMucennebSharp")).move(noteLeft, 57).fill(noteColor);
    
        noteLeft = 250;
    
        // quarters
        let noteTop = 76.5;
        let rw = 1.3, rh = 29;
        painter.path(symbols.getPath("noteheadBlackUp")).move(noteLeft, noteTop).fill(noteColor);
        let [nw] = symbols.getDims("noteheadBlackUp");
        painter.rect(rw, rh).radius(0.5).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
    
        noteTop = 63;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackDown")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackDown");
        painter.rect(rw, rh).radius(0.5).move(noteLeft, noteTop + 7).fill(noteColor);
    
        // 8ths
        noteTop = 81;
        noteLeft += 30;
        let group = painter.group();
        group.path(symbols.getPath("noteheadBlackUp")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackUp");
    
        group.rect(rw, rh).radius(0.5).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
        group.path(symbols.getPath("flag8thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
    
        noteTop = 54;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackDown")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackDown");
        painter.rect(rw, rh).radius(0.5).move(noteLeft, noteTop + 8).fill(noteColor);
        painter.path(symbols.getPath("flag8thDown")).move(noteLeft, noteTop + 7).fill(noteColor);
    
        // 16ths
        noteTop = 81;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackUp")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackUp");
        painter.rect(rw, rh).radius(0.5).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
        painter.path(symbols.getPath("flag16thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
    
        noteTop = 54;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackDown")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackDown");
        painter.rect(rw, rh).radius(0.5).move(noteLeft, noteTop + 8).fill(noteColor);
        painter.path(symbols.getPath("flag16thDown")).move(noteLeft, noteTop + 7).fill(noteColor);
    
        // 32nds
        noteTop = 85.5;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackUp")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackUp");
        rh = 33.5;
        painter.rect(rw, rh).radius(0.5).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
        painter.path(symbols.getPath("flag32ndUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
    
        noteTop = 49.5;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackDown")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackDown");
        painter.rect(rw, rh).radius(0.5).move(noteLeft, noteTop + 8).fill(noteColor);
        painter.path(symbols.getPath("flag32ndDown")).move(noteLeft, noteTop + 7).fill(noteColor);
    
        // 64ths
        noteTop = 90;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackUp")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackUp");
        rh = 38;
        painter.rect(rw, rh).radius(0.5).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
        painter.path(symbols.getPath("flag64thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);
    
        noteTop = 45;
        noteLeft += 30;
        painter.path(symbols.getPath("noteheadBlackDown")).move(noteLeft, noteTop).fill(noteColor);
        [nw] = symbols.getDims("noteheadBlackDown");
        painter.rect(rw, rh).radius(0.5).move(noteLeft, noteTop + 8).fill(noteColor);
        painter.path(symbols.getPath("flag64thDown")).move(noteLeft, noteTop + 7).fill(noteColor);
    
        // half
        noteTop = 72;
        noteLeft += 20;
        painter.path(symbols.getPath("noteheadHalf")).move(noteLeft, noteTop).fill(noteColor);
    
        // whole
        noteLeft += 20;
        painter.path(symbols.getPath("noteheadWhole")).move(noteLeft, noteTop).fill(noteColor);
    
        // rests
        noteLeft += 50;
        painter.path(symbols.getPath("restQuarter")).move(noteLeft, 60).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("rest8th")).move(noteLeft, 65).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("rest16th")).move(noteLeft, 65).fill(noteColor);
        noteLeft += 15;
        painter.path(symbols.getPath("rest32nd")).move(noteLeft, 56).fill(noteColor);
    
        staff = new Staff(1, this.width, this.painter, this.fontLoader, this.activeColorScheme, true);
        staff.render();
    */
  }
}
