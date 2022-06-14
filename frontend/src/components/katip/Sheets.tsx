import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { Theme } from "store/slices/theme";
import { ActionMode } from "store/slices/note-modifiers";

import Score from "./score/Score";

import "./Sheets.scss";

let score: Score;
const Sheets = () => {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);

  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionDuration = useSelector<RootState, string>(state => state.noteModifier.duration);
  const actionDotted = useSelector<RootState, boolean>(state => state.noteModifier.isDotted);
  const actionAccidental = useSelector<RootState, string>(state => state.noteModifier.accidental);

  useEffect(() => {
    score = new Score("score-root", 2);
  }, []);

  useEffect(() => {
    score.setTheme(theme);
    // score.drawTests();
  }, [theme]);

  useEffect(() => {
    score.setHasSound(isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    score.drawTests();
  }, []);

  useEffect(() => {
    score.setAction(actionMode);
  }, [actionMode]);

  useEffect(() => {
    score.setDuration(actionDuration);
  }, [actionDuration]);

  useEffect(() => {
    score.setDotted(actionDotted);
  }, [actionDotted]);

  useEffect(() => {
    score.setAccidental(actionAccidental);
  }, [actionAccidental]);

  return (
    <div id="score-root"></div>
  );
};

export default Sheets;