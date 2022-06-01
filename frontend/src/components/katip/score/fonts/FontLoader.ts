import FontType from "./FontType";

export class FontLoader {
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
      this.font.glyphs[symbolKey].yOffset || 0
    ];
  }
}