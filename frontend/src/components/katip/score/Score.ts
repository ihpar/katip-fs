import Soundfont from "soundfont-player";
import { DEFAULT_MAKAM } from "./Makams";
import { DEFAULT_USUL } from "./Usuls";

import Page from "./Page";

export default class Score {
  readonly width = 836;

  readonly height = 1202;

  pages: Page[];

  hasSound = false;

  player: Soundfont.Player;

  defaultMakam = DEFAULT_MAKAM;

  defaultUsul = DEFAULT_USUL;

  constructor(
    private scoreRootId: string,
    private numPages = 1,
  ) {
    this.pages = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.numPages; i += 1) {
      this.pages.push(new Page(
        this.scoreRootId,
        i,
        this.width,
        this.height,
        this.defaultMakam,
        this.defaultUsul,
      ));
    }
  }

  setHasSound(hasSound: boolean) {
    const that = this;
    that.hasSound = hasSound;
    if (that.hasSound && !that.player) {
      Soundfont.instrument(new AudioContext(), "acoustic_grand_piano")
        .then((instrument) => {
          that.player = instrument;
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  drawTests() {
    /*
        const symbols = this.fontLoader;
        const painter = this.painter;
        painter.clear();

        const mainColor = this.activeColorScheme.mainColor;
        const noteColor = this.activeColorScheme.noteColor;

        // time sig
        painter.path(symbols.getPath("timeSig9")).move(40, 54 + 1).fill(mainColor);
        painter.path(symbols.getPath("timeSig8")).move(40, 72 + 1).fill(mainColor);

        // acci
        let noteLeft = 70;
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
        group.path(
          symbols.getPath("flag8thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);

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
        painter.path(
          symbols.getPath("flag16thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);

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
        painter.path(
          symbols.getPath("flag32ndUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);

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
        painter.path(
          symbols.getPath("flag64thUp")).move(noteLeft + nw - rw, noteTop - rh + 2).fill(noteColor);

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

        staff = new Staff(
          1, this.width, this.painter, this.fontLoader, this.activeColorScheme, true);
        staff.render();
    */
  }

  /*
  setAction(controlAction: typeof action) {
  }
  */
}
