import { useEffect } from "react";

import "./NoteSheet.scss";

import Snap from "snapsvg-cjs";

const NoteSheet = () => {
  useEffect(() => {
    const s = Snap("#sheet");
    const bigSquare = s.rect(100, 100, 200, 200);
    console.log(bigSquare);
  }, []);

  return <svg className="sheet" id="sheet" xmlns="http://www.w3.org/2000/svg"></svg>;
};

export default NoteSheet;
