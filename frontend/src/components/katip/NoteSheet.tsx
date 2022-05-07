import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Soundfont from "soundfont-player";
import { RootState } from "../../store";
import { playerActions } from "../../store/player";

import "./NoteSheet.scss";

const TmmScore = require("./sheet");

let tmmEditor: any = null;

const NoteSheet = () => {
  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);
  const isPlaying = useSelector<RootState, boolean>((state) => state.player.playing);
  const isInstrumentCreated = useSelector<RootState, boolean>((state) => state.player.isInstrumentCreated);

  const accidental = useSelector<RootState, string | null>((state) => state.noteModifier.accidental);
  const noteDuration = useSelector<RootState, string>((state) => state.noteModifier.duration);
  const isDotted = useSelector<RootState, boolean>((state) => state.noteModifier.isDotted);

  const isRest = useSelector<RootState, boolean>((state) => state.noteModifier.isRest);
  const restObj = useSelector<RootState, { value: string; duration: string }>((state) => state.noteModifier.restParams);

  const dispatch = useDispatch();

  const songEndedHandler = useCallback(() => {
    dispatch(playerActions.stopPlaying());
  }, [dispatch]);

  useEffect(() => {
    if (!tmmEditor) {
      tmmEditor = new TmmScore("#sheet");
      tmmEditor.setSongEndedHandler(songEndedHandler);
      tmmEditor.begin();
    }
  }, [songEndedHandler]);

  useEffect(() => {
    if (isInstrumentCreated) {
      Soundfont.instrument(new AudioContext(), "acoustic_grand_piano").then((inst: any) => {
        tmmEditor.setInstrument(inst);
      });
    }
  }, [isInstrumentCreated]);

  useEffect(() => {
    tmmEditor.toggleSound(isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    tmmEditor.togglePlay(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    tmmEditor.setAccidental(accidental);
  }, [accidental]);

  useEffect(() => {
    tmmEditor.setDuration(noteDuration);
  }, [noteDuration]);

  useEffect(() => {
    tmmEditor.setIsDotted(isDotted);
  }, [isDotted]);

  useEffect(() => {
    if (isRest && restObj.value && restObj.duration) {
      tmmEditor.setRest(restObj.value, restObj.duration);
    }
  }, [isRest, restObj]);

  return <div id="sheet"></div>;
};

export default NoteSheet;
