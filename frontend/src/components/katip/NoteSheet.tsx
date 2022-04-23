import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Soundfont from "soundfont-player";

const TmmScore = require("./sheet");
let tmmEditor: any = null;
let soundFontInstrument: any = null;
/*
Soundfont.instrument(new AudioContext(), "acoustic_grand_piano", { soundfont: "FluidR3_GM", gain: 8 })
          .then((ins: any) => {
            dispatch(soundActions.setInstrument(ins));
            dispatch(soundActions.playSound({ pitch: "A4", dur: 0.5 }));
            setInstrumentCreated(true);
          })
          .catch((err: any) => console.log("Sound font error!", err));
*/

const NoteSheet = () => {
  const soundOn: boolean = useSelector<RootState, boolean>((state) => state.soundOn);
  console.log(soundOn);

  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tmmEditor) {
      tmmEditor = new TmmScore("#sheet");
      tmmEditor.begin();
    }
  }, []);

  return <div ref={sheetRef} id="sheet" style={{ width: "90%", margin: 10 }}></div>;
};

export default NoteSheet;
