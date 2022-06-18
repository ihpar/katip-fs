import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { noteModifierActions } from "store/slices/note-modifiers";
import { ActionMode } from "store/slices/note-modifiers";

import "./DurationActions.scss";

const durations = [
  { name: "whole", value: "1/1" },
  { name: "half", value: "1/2" },
  { name: "fourth", value: "1/4" },
  { name: "eighth", value: "1/8" },
  { name: "sixteenth", value: "1/16" },
  { name: "thirtysecond", value: "1/32" },
  { name: "sixtyfourth", value: "1/64" },
];

const DurationActions = () => {
  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionDuration = useSelector<RootState, string>(state => state.noteModifier.duration);

  const dispatch = useDispatch();

  const durationButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const noteDuration = event.currentTarget.dataset.value;

    if (actionMode === ActionMode.InsertNote && noteDuration === actionDuration) {
      dispatch(noteModifierActions.setMode(ActionMode.Select));
      dispatch(noteModifierActions.changeDuration(""));
    }
    else {
      dispatch(noteModifierActions.setMode(ActionMode.InsertNote));
      dispatch(noteModifierActions.changeDuration(noteDuration));
    }
  };

  return (
    <ul className="top-menu-list duration-controls">
      {durations.map((duration) => (
        <li key={duration.name}>
          <button
            data-value={duration.value}
            onClick={durationButtonClickHandler}
            className={actionMode === ActionMode.InsertNote && actionDuration === duration.value ? "active" : ""}>
            <span className={`durs ${duration.name}`}></span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DurationActions;
