import { useEffect, useRef } from "react";

const TmmScore = require("./sheet");

const NoteSheet = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tmmScore = new TmmScore("#sheet");
    tmmScore.begin();
  }, []);

  return <div ref={sheetRef} id="sheet"></div>;
};

export default NoteSheet;
