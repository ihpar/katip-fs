import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../../store/player";
import { RootState } from "../../../store";

import soundOff from "../../../images/controls/sound-off.svg";
import soundOn from "../../../images/controls/sound-on.svg";
import rewind from "../../../images/controls/rewind.svg";
import play from "../../../images/controls/play.svg";
import pause from "../../../images/controls/pause.svg";
import repeat from "../../../images/controls/repeat.svg";
import metronome from "../../../images/controls/metronome.svg";
import tuningFork from "../../../images/controls/tuning-fork.svg";

const PlayerController = () => {
  const dispatch = useDispatch();

  const isSoundOn = useSelector<RootState, boolean>((state) => state.player.soundOn);
  const isPlaying = useSelector<RootState, boolean>((state) => state.player.playing);

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
          <img alt="filler" className="img-ht on" src={soundOn} />
          <img alt="filler" className="img-ht off" src={soundOff} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={rewind} />
        </button>
      </li>
      <li>
        <button onClick={playButtonClickHandler}>
          <img alt="filler" className="img-ht" src={isPlaying ? pause : play} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={repeat} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={metronome} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={tuningFork} />
        </button>
      </li>
    </ul>
  );
};

export default PlayerController;
