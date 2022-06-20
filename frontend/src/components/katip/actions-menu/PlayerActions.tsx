import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "store/slices/player";
import { RootState } from "store/index";

import "./PlayerActions.scss";

const PlayerActions = () => {
  const dispatch = useDispatch();

  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);
  const isPlaying = useSelector<RootState, boolean>((state) => state.player.playing);
  // sound, rewind, play, loop, metronome, fork

  const soundButtonClickHandler = () => {
    dispatch(playerActions.toggleSound());
  };

  const playButtonClickHandler = () => {
    dispatch(playerActions.togglePlaying());
  };

  return (
    <ul className="top-menu-list player-controls">
      <li>
        <button type="button" onClick={soundButtonClickHandler} data-sound-status={isSoundOn}>
          <span className={`p-act sound ${isSoundOn ? "on" : "off"}`} />
        </button>
      </li>
      <li>
        <button type="button">
          <span className="p-act rewind" />
        </button>
      </li>
      <li>
        <button type="button" onClick={playButtonClickHandler}>
          <span className={`p-act ${isPlaying ? "pause" : "play"}`} />
        </button>
      </li>
      <li>
        <button type="button">
          <span className="p-act loop" />
        </button>
      </li>
      <li>
        <button type="button">
          <span className="p-act metronome" />
        </button>
      </li>
      <li>
        <button type="button">
          <span className="p-act tuning-fork" />
        </button>
      </li>
    </ul>
  );
};

export default PlayerActions;
