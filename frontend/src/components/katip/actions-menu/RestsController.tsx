import { useDispatch } from "react-redux";
import { noteModifierActions } from "../../../store/note-modifiers";

import "./RestsController.scss";

import rest_4 from "../../../images/controls/rest_4.svg";
import rest_8 from "../../../images/controls/rest_8.svg";
import rest_16 from "../../../images/controls/rest_16.svg";
import rest_32 from "../../../images/controls/rest_32.svg";
import React, { useState } from "react";

const rests = [
  { value: "r4", durValue: "1/4", img: rest_4 },
  { value: "r8", durValue: "1/8", img: rest_8 },
  { value: "r16", durValue: "1/16", img: rest_16 },
  { value: "r32", durValue: "1/32", img: rest_32 },
];

const RestsController = () => {
  const [isRestsVisible, setIsRestsVisible] = useState(false);
  const [selectedRest, setSelectedRest] = useState("r4");

  const dispatch = useDispatch();

  const toggleRestButtons = () => {
    setIsRestsVisible((isVisible) => !isVisible);
  };

  const restButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedValue = event.currentTarget.dataset.restVal as string;
    const selectedDur = event.currentTarget.dataset.durVal as string;

    setSelectedRest(selectedValue);
    toggleRestButtons();

    dispatch(noteModifierActions.setRest({ value: selectedValue, duration: selectedDur }));
  };

  const restsWrapperClass = `rests-wrapper ${isRestsVisible ? "visible" : "hidden"}`;
  const selectedRestImg = rests.find((rest) => rest.value === selectedRest)!.img;

  return (
    <ul className="top-menu-list rest-controls">
      <li className="rests-li">
        <button className="btn-selected-rest" onClick={toggleRestButtons}>
          <img src={selectedRestImg} alt={selectedRest} />
        </button>
        <div className={restsWrapperClass}>
          <ul>
            {rests.map((rest) => (
              <li key={rest.value}>
                <button onClick={restButtonClickHandler} data-rest-val={rest.value} data-dur-val={rest.durValue}>
                  <img src={rest.img} alt={rest.value} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default RestsController;
