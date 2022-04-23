import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Soundfont from "soundfont-player";
import { RootState } from "../../store";
import { playerActions } from "../../store/player";

import "./NoteSheet.scss";

const TmmScore = require("./sheet");

let tmmEditor: any = null;
let instrument: any = null;

const NoteSheet = () => {
  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);
  const isPlaying = useSelector<RootState, boolean>((state) => state.player.playing);

  const dispatch = useDispatch();

  const songEndedHandler = () => {
    dispatch(playerActions.stopPlaying());
    console.log("Song ended");
  };

  useEffect(() => {
    if (!tmmEditor) {
      tmmEditor = new TmmScore("#sheet");
      tmmEditor.setSongEndedHandler(songEndedHandler);
      tmmEditor.begin();
    }
  }, [songEndedHandler]);

  useEffect(() => {
    if (isSoundOn && !instrument) {
      Soundfont.instrument(new AudioContext(), "acoustic_grand_piano").then((inst: any) => {
        instrument = inst;
        tmmEditor.setInstrument(inst);
      });
    }

    tmmEditor.toggleSound(isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    tmmEditor.togglePlay(isPlaying);
  }, [isPlaying]);

  return <div id="sheet"></div>;
};

export default NoteSheet;
