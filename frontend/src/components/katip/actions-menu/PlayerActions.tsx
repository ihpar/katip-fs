import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "store/slices/player";
import { RootState } from "store/index";

import "./PlayerActions.scss";

const PlayerActions: React.FC<{ isDark: boolean; }> = ({ isDark }) => {
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
        <button onClick={soundButtonClickHandler} data-sound-status={isSoundOn}>
          <span className={`p-act sound ${isSoundOn ? "on" : "off"}`}></span>
        </button>
      </li>
      <li>
        <button>
          <span className="p-act rewind"></span>
        </button>
      </li>
      <li>
        <button onClick={playButtonClickHandler}>
          <span className={`p-act ${isPlaying ? "pause" : "play"}`}></span>
        </button>
      </li>
      <li>
        <button>
          <span className="p-act loop"></span>
        </button>
      </li>
      <li>
        <button>
          <span className="p-act metronome"></span>
        </button>
      </li>
      <li>
        <button>
          <span className="p-act tuning-fork"></span>
        </button>
      </li>
    </ul>
  );
};

export default PlayerActions;
