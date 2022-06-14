import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { noteModifierActions } from "store/slices/note-modifiers";
import { ActionMode } from "store/slices/note-modifiers";

import "./DurationActions.scss";

const durations = [
  { name: "whole", value: "n1" },
  { name: "half", value: "n2" },
  { name: "fourth", value: "n4" },
  { name: "eighth", value: "n8" },
  { name: "sixteenth", value: "n16" },
  { name: "thirtysecond", value: "n32" },
  { name: "sixtyfourth", value: "n64" },
  { name: "dotted", value: "bd" },
];

const DurationActions = () => {
  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const dispatch = useDispatch();

  const durationButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: fix here
    const noteDuration = event.currentTarget.dataset.durVal;
    event.currentTarget.classList.toggle("active");
    if (noteDuration === "bd") {
      if (actionMode === ActionMode.InsertNote) {
        dispatch(noteModifierActions.toggleDotted());
        return;
      }
    }
    dispatch(noteModifierActions.changeDuration(noteDuration));
    dispatch(noteModifierActions.setMode(ActionMode.InsertNote));
  };

  return (
    <ul className="top-menu-list duration-controls">
      {durations.map((duration) => (
        <li key={duration.name}>
          <button data-dur-val={duration.value} onClick={durationButtonClickHandler}>
            <span className={`durs ${duration.name}`}></span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DurationActions;
