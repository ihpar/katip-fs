import FontType from "./FontType";
import BravuraFont from "./bravura";

class FontLoader {
  font: FontType;

  constructor(font: FontType) {
    this.font = font;
  }

  getPath(symbolKey: string): string {
    return this.font.glyphs[symbolKey].path || this.font.glyphs[symbolKey].original;
  }

  getDims(symbolKey: string): number[] {
    return [
      this.font.glyphs[symbolKey].width,
      this.font.glyphs[symbolKey].height,
      this.font.glyphs[symbolKey].yOffset || 0,
    ];
  }

  getWidth(symbolKey: string): number {
    return this.font.glyphs[symbolKey].width;
  }

  getYOffset(symbolKey: string): number {
    return this.font.glyphs[symbolKey].yOffset || 0;
  }
}

const symbols = new FontLoader(BravuraFont);
export default symbols;
