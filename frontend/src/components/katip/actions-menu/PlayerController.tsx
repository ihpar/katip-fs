import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../../store/player";
import { RootState } from "../../../store";

import soundOff from "../../../images/controls/sound-off.svg";
import soundOffDark from "../../../images/controls/sound-off_dark.svg";
import soundOn from "../../../images/controls/sound-on.svg";
import soundOnDark from "../../../images/controls/sound-on_dark.svg";
import rewind from "../../../images/controls/rewind.svg";
import rewindDark from "../../../images/controls/rewind_dark.svg";
import play from "../../../images/controls/play.svg";
import playDark from "../../../images/controls/play_dark.svg";
import pause from "../../../images/controls/pause.svg";
import pauseDark from "../../../images/controls/pause_dark.svg";
import repeat from "../../../images/controls/repeat.svg";
import repeatDark from "../../../images/controls/repeat_dark.svg";
import metronome from "../../../images/controls/metronome.svg";
import metronomeDark from "../../../images/controls/metronome_dark.svg";
import tuningFork from "../../../images/controls/tuning-fork.svg";
import tuningForkDark from "../../../images/controls/tuning-fork_dark.svg";

const PlayerController: React.FC<{ isDark: boolean; }> = ({ isDark }) => {
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
          <img alt="filler" className="img-ht on" src={isDark ? soundOnDark : soundOn} />
          <img alt="filler" className="img-ht off" src={isDark ? soundOffDark : soundOff} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={isDark ? rewindDark : rewind} />
        </button>
      </li>
      <li>
        <button onClick={playButtonClickHandler}>
          <img alt="filler" className="img-ht" src={
            isPlaying ?
              (isDark ? pauseDark : pause) :
              (isDark ? playDark : play)
          } />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={isDark ? repeatDark : repeat} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={isDark ? metronomeDark : metronome} />
        </button>
      </li>
      <li>
        <button>
          <img alt="filler" className="img-ht" src={isDark ? tuningForkDark : tuningFork} />
        </button>
      </li>
    </ul>
  );
};

export default PlayerController;
