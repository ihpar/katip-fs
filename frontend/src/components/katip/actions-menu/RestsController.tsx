import React from "react";
import { useDispatch } from "react-redux";
import { noteModifierActions } from "store/slices/note-modifiers";

import "./RestsController.scss";

import rest_4 from "static/images/controls/rests/rest_4.svg";
import rest_4_Dark from "static/images/controls/rests/rest_4_dark.svg";
import rest_8 from "static/images/controls/rests/rest_8.svg";
import rest_8_Dark from "static/images/controls/rests/rest_8_dark.svg";
import rest_16 from "static/images/controls/rests/rest_16.svg";
import rest_16_Dark from "static/images/controls/rests/rest_16_dark.svg";
import rest_32 from "static/images/controls/rests/rest_32.svg";
import rest_32_Dark from "static/images/controls/rests/rest_32_dark.svg";

const rests = [
  { value: "r4", durValue: "1/4", img: rest_4, imgDark: rest_4_Dark },
  { value: "r8", durValue: "1/8", img: rest_8, imgDark: rest_8_Dark },
  { value: "r16", durValue: "1/16", img: rest_16, imgDark: rest_16_Dark },
  { value: "r32", durValue: "1/32", img: rest_32, imgDark: rest_32_Dark },
];

const RestsController: React.FC<{ isDark: boolean; }> = ({ isDark }) => {
  const dispatch = useDispatch();

  const restButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedValue = event.currentTarget.dataset.restVal as string;
    const selectedDur = event.currentTarget.dataset.durVal as string;
    dispatch(noteModifierActions.setRest({ value: selectedValue, duration: selectedDur }));
  };

  return (
    <ul className="top-menu-list rest-controls">
      {rests.map((rest) => (
        <li key={rest.value}>
          <button onClick={restButtonClickHandler}
            data-rest-val={rest.value}
            data-dur-val={rest.durValue}>
            <img src={isDark ? rest.imgDark : rest.img} alt={rest.value} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RestsController;
