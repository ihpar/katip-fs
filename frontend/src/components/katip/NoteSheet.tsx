import { useEffect, useRef } from "react";

import Snap from "snapsvg";
// import TmmScore from "./sheet";

const NoteSheet = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.innerHTML = "test";

      const s = Snap("#svg");
      const bigSquare = s.rect(100, 100, 200, 200);

      s.circle(100, 100, 7);

      bigSquare.attr({
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 5,
      });
    }
  }, []);

  return (
    <div ref={sheetRef} id="sheet">
      <svg id="svg" height="100vh" width="100wv" version="1.1" xmlns="http://www.w3.org/2000/svg" />
    </div>
  );
};

export default NoteSheet;
