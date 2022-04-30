import { useDispatch } from "react-redux";
import { noteModifierActions } from "../../../store/note-modifiers";

const accidentals = [
  { name: "bekar", value: "n" },
  { name: "fazla-bemol", value: "b1" },
  { name: "bakiyye-bemol", value: "b4" },
  { name: "k-mucennep-bemol", value: "b5" },
  { name: "b-mucennep-bemol", value: "b8" },
  { name: "tanini-bemol", value: "b9" },
  { name: "fazla-diyez", value: "d1" },
  { name: "bakiyye-diyez", value: "d4" },
  { name: "k-mucennep-diyez", value: "d5" },
  { name: "b-mucennep-diyez", value: "d8" },
  { name: "tanini-diyez", value: "d9" },
];

const AccidentalsController = () => {
  const dispatch = useDispatch();

  const accidentalButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAccidental = event.currentTarget.dataset.accVal;
    dispatch(noteModifierActions.changeAccidental(selectedAccidental));
  };

  return (
    <ul className="top-menu-list accidental-controls">
      {accidentals.map((accidental) => (
        <li key={accidental.value}>
          <button data-acc-val={accidental.value} onClick={accidentalButtonClickHandler}>
            <span className={`acci ${accidental.name}`}></span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AccidentalsController;
