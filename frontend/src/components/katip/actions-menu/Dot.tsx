import { useDispatch, useSelector } from "react-redux";

import { noteModifierActions } from "store/slices/note-modifiers";
import { RootState } from "store";
import { ActionMode } from "store/slices/note-modifiers";
import { useEffect } from "react";

const Dot = () => {
  const dispatch = useDispatch();

  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionIsDotted = useSelector<RootState, boolean>(state => state.noteModifier.isDotted);

  const dotClickHandler = () => {
    if (actionMode === ActionMode.InsertNote) {
      if (actionIsDotted) {
        dispatch(noteModifierActions.unsetDotted());
      }
      else {
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
          className={actionIsDotted ? "active" : ""}
          data-value="dot"
          onClick={dotClickHandler}>
          <span className="durs dotted"></span>
        </button>
      </li>
    </ul>
  );
};

export default Dot;