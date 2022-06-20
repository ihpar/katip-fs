import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { noteModifierActions, ActionMode } from "store/slices/note-modifiers";

import "./RestActions.scss";

const rests = [
  { value: "1/1", name: "rest_1" },
  { value: "1/2", name: "rest_2" },
  { value: "1/4", name: "rest_4" },
  { value: "1/8", name: "rest_8" },
  { value: "1/16", name: "rest_16" },
  { value: "1/32", name: "rest_32" },
];

const RestActions = () => {
  const dispatch = useDispatch();
  const actionMode = useSelector<RootState, ActionMode>((state) => state.noteModifier.mode);
  const actionDuration = useSelector<RootState, string>((state) => state.noteModifier.duration);

  const restButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const restDuration = event.currentTarget.dataset.value as string;
    if (actionMode === ActionMode.InsertRest && restDuration === actionDuration) {
      dispatch(noteModifierActions.setMode(ActionMode.Select));
      dispatch(noteModifierActions.changeDuration(""));
    } else {
      dispatch(noteModifierActions.setMode(ActionMode.InsertRest));
      dispatch(noteModifierActions.changeDuration(restDuration));
    }
  };

  return (
    <ul className="top-menu-list rest-controls">
      {rests.map((rest) => (
        <li key={rest.value}>
          <button
            type="button"
            className={actionMode === ActionMode.InsertRest && actionDuration === rest.value ? "active" : ""}
            onClick={restButtonClickHandler}
            data-value={rest.value}
          >
            <span className={`rests ${rest.name}`} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RestActions;
