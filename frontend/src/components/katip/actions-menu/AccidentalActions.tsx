import { useDispatch, useSelector } from "react-redux";
import { noteModifierActions } from "store/slices/note-modifiers";
import { RootState } from "store";
import { ActionMode } from "store/slices/note-modifiers";
import { useEffect } from "react";

import "./AccidentalActions.scss";

const accidentals = [
  { name: "bekar", value: "n:n" },
  { name: "fazla-bemol", value: "b:1" },
  { name: "bakiyye-bemol", value: "b:4" },
  { name: "k-mucennep-bemol", value: "b:5" },
  { name: "b-mucennep-bemol", value: "b:8" },
  { name: "tanini-bemol", value: "b:9" },
  { name: "fazla-diyez", value: "d:1" },
  { name: "bakiyye-diyez", value: "d:4" },
  { name: "k-mucennep-diyez", value: "d:5" },
  { name: "b-mucennep-diyez", value: "d:8" },
  { name: "tanini-diyez", value: "d:9" },
];

const AccidentalActions = () => {
  const dispatch = useDispatch();

  const actionMode = useSelector<RootState, ActionMode>(state => state.noteModifier.mode);
  const actionAccidental = useSelector<RootState, string>(state => state.noteModifier.accidental);

  const accidentalButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (actionMode === ActionMode.InsertNote) {
      const accidental = event.currentTarget.dataset.value;
      if (accidental === actionAccidental) {
        dispatch(noteModifierActions.changeAccidental(""));
      }
      else {
        dispatch(noteModifierActions.changeAccidental(accidental));
      }
    }
  };

  useEffect(() => {
    if (actionMode !== ActionMode.InsertNote) {
      dispatch(noteModifierActions.changeAccidental(""));
    }
  }, [actionMode, dispatch]);

  return (
    <ul className="top-menu-list accidental-controls">
      {accidentals.map((accidental) => (
        <li key={accidental.value}>
          <button
            className={actionAccidental === accidental.value ? "active" : ""}
            data-value={accidental.value}
            onClick={accidentalButtonClickHandler}>
            <span className={`acci ${accidental.name}`}></span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AccidentalActions;
