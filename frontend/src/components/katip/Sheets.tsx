import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { ActionMode } from "store/slices/note-modifiers";

import Score from "./score/Score";

import "./Sheets.scss";

let score: Score;
const Sheets = () => {
  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);

  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionAccidental = useSelector<RootState, string>(state => state.noteModifier.accidental);
  const actionDuration = useSelector<RootState, string>(state => state.noteModifier.duration);
  const actionDotted = useSelector<RootState, boolean>(state => state.noteModifier.isDotted);

  useEffect(() => {
    if (!score) {
      score = new Score("score-root", 2);
    }
  }, []);

  useEffect(() => {
    score.setHasSound(isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    score.drawTests();
  }, []);

  useEffect(() => {
    score.setAction({
      mode: actionMode,
      accidental: actionAccidental,
      duration: actionDuration,
      isDotted: actionDotted,
    });
  }, [actionMode, actionAccidental, actionDuration, actionDotted]);

  return (
    <div id="score-root"></div>
  );
};

export default Sheets;