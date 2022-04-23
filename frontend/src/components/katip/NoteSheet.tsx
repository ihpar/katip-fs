import { useEffect } from "react";
import { useSelector } from "react-redux";
import Soundfont from "soundfont-player";
import { RootState } from "../../store";

const TmmScore = require("./sheet");

let tmmEditor: any = null;
let instrument: any = null;

const NoteSheet = () => {
  const isSoundOn: boolean = useSelector<RootState, boolean>((state) => state.player.soundOn);

  useEffect(() => {
    if (!tmmEditor) {
      tmmEditor = new TmmScore("#sheet");
      tmmEditor.begin();
    }
  }, []);

  useEffect(() => {
    if (isSoundOn && !instrument) {
      Soundfont.instrument(new AudioContext(), "acoustic_grand_piano").then((inst: any) => {
        instrument = inst;
        tmmEditor.setInstrument(inst);
      });
    }

    tmmEditor.toggleSound(isSoundOn);
  }, [isSoundOn]);

  return <div id="sheet" style={{ width: "90%", margin: 10 }}></div>;
};

export default NoteSheet;
