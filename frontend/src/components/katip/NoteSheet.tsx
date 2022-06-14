import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Soundfont from "soundfont-player";
import { RootState } from "store/index";
import { playerActions } from "store/slices/player";
import TmmScore from "./sheet/TmmScore";

import "./NoteSheet.scss";

let tmmEditor: TmmScore;

const NoteSheet = () => {
  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);
  const isPlaying = useSelector<RootState, boolean>((state) => state.player.playing);
  const isInstrumentCreated = useSelector<RootState, boolean>((state) => state.player.isInstrumentCreated);

  const accidental = useSelector<RootState, string | null>((state) => state.noteModifier.accidental);
  const noteDuration = useSelector<RootState, string>((state) => state.noteModifier.duration);
  const isDotted = useSelector<RootState, boolean>((state) => state.noteModifier.isDotted);

  const theme = useSelector<RootState, string>(state => state.theme.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tmmEditor) {
      tmmEditor = new TmmScore("#sheet");
    }
  }, []);

  const songEndedHandler = useCallback(() => {
    dispatch(playerActions.stopPlaying());
  }, [dispatch]);

  useEffect(() => {
    tmmEditor.setSongEndedHandler(songEndedHandler);
  }, [songEndedHandler]);

  useEffect(() => {
    tmmEditor.changeTheme(theme);
  }, [theme]);

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
    tmmEditor.begin();
  }, []);

  return (
    <div className="A4">
      <div id="sheet"></div>
    </div>
  );
};

export default NoteSheet;
