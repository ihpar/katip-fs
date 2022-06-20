import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { noteModifierActions, ActionMode } from "store/slices/note-modifiers";
import { RootState } from "store";

import "./Dot.scss";

const Dot = () => {
  const dispatch = useDispatch();

  const actionMode = useSelector<RootState, ActionMode>((state) => state.noteModifier.mode);
  const actionIsDotted = useSelector<RootState, boolean>((state) => state.noteModifier.isDotted);

  const dotClickHandler = () => {
    if (actionMode === ActionMode.InsertNote) {
      if (actionIsDotted) {
        dispatch(noteModifierActions.unsetDotted());
      } else {
        dispatch(noteModifierActions.setDotted());
      }
    }
  };

  useEffect(() => {
    if (actionMode !== ActionMode.InsertNote) {
      dispatch(noteModifierActions.unsetDotted());
    }
  }, [actionMode, dispatch]);

  return (
    <ul className="top-menu-list duration-controls">
      <li>
        <button
          type="button"
          className={actionIsDotted ? "active" : ""}
          data-value="dot"
          onClick={dotClickHandler}
        >
          <span className="durs dotted" />
        </button>
      </li>
    </ul>
  );
};

export default Dot;
