import { G } from "@svgdotjs/svg.js";
import { symbols } from "./fonts/FontLoader";
import { NotePositions } from "./NotePositions";

class Accidental {
  symbols;
  lineGap = 9;
  dims: number[];
  path: string;
  pitchStr: string;

  constructor(accidentalStr: string, public rootGroup: G) {
    this.symbols = symbols;

    const [pitch, acci] = accidentalStr.split("-"); // fa+5-d:4 
    const [pitchRoot, octave] = pitch.split("+"); // ["fa", "5"]
    this.pitchStr = pitchRoot + octave; // fa5
    const [acciDirection, acciAmount] = acci.split(":"); // ["d", "4"]
    const acciStr = "accidental_" + acciDirection + acciAmount; // accidental_d4

    this.path = this.symbols.getPath(acciStr); // w, h, y
    this.dims = this.symbols.getDims(acciStr);
  }

  render(left: number, top: number) {
    const acciTop = NotePositions[this.pitchStr];
    this.rootGroup.path(this.path)
      .move(left, top + this.dims[2] + acciTop * this.lineGap)
      .addClass("note-color");
  }

  get width() {
    return this.dims[0];
  }
}

export default Accidental;