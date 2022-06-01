interface FontType {
  glyphs:
  {
    [key: string]: {
      code: string;
      path: string;
      original: string;
      width: number;
      height: number;
      yOffset?: number;
    };
  };
}

export default FontType;