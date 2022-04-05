import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { soundActions } from "../../store";

import Snap from "snapsvg-cjs";
// import TmmScore from "./sheet";
const TmmScore = require("./sheet");

const NoteSheet = () => {
  const myStr: any = useSelector<any>((state) => {
    console.log(state);
    return state;
  });
  console.log("Hey: " + myStr.myVar);
  // state

  // object

  const sheetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("use eff call");
    const tmmScore = new TmmScore("#sheet", myStr.myVar);
    tmmScore.begin();
  }, [myStr]);

  return <div ref={sheetRef} id="sheet" style={{ width: "90%", margin: 10 }}></div>;
};

export default NoteSheet;
