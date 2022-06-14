import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { noteModifierActions } from "store/slices/note-modifiers";
import { ActionMode } from "store/slices/note-modifiers";

import "./RestActions.scss";

import rest_4 from "static/images/controls/rests/rest_4.svg";
import rest_4_Dark from "static/images/controls/rests/rest_4_dark.svg";
import rest_8 from "static/images/controls/rests/rest_8.svg";
import rest_8_Dark from "static/images/controls/rests/rest_8_dark.svg";
import rest_16 from "static/images/controls/rests/rest_16.svg";
import rest_16_Dark from "static/images/controls/rests/rest_16_dark.svg";
import rest_32 from "static/images/controls/rests/rest_32.svg";
import rest_32_Dark from "static/images/controls/rests/rest_32_dark.svg";

const rests = [
  { value: "1/4", img: rest_4, imgDark: rest_4_Dark },
  { value: "1/8", img: rest_8, imgDark: rest_8_Dark },
  { value: "1/16", img: rest_16, imgDark: rest_16_Dark },
  { value: "1/32", img: rest_32, imgDark: rest_32_Dark },
];

const RestActions: React.FC<{ isDark: boolean; }> = ({ isDark }) => {
  const dispatch = useDispatch();
  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionDuration = useSelector<RootState, string>(state => state.noteModifier.duration);

  const restButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const restDuration = event.currentTarget.dataset.value as string;
    if (actionMode === ActionMode.InsertRest && restDuration === actionDuration) {
      dispatch(noteModifierActions.setMode(ActionMode.Select));
      dispatch(noteModifierActions.changeDuration(""));
    }
    else {
      dispatch(noteModifierActions.setMode(ActionMode.InsertRest));
      dispatch(noteModifierActions.changeDuration(restDuration));
    }
  };

  return (
    <ul className="top-menu-list rest-controls">
      {rests.map((rest) => (
        <li key={rest.value}>
          <button
            className={actionMode === ActionMode.InsertRest && actionDuration === rest.value ? "active" : ""}
            onClick={restButtonClickHandler}
            data-value={rest.value}>
            <img src={isDark ? rest.imgDark : rest.img} alt={rest.value} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RestActions;
