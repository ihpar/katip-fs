import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../../store/player";
import { RootState } from "../../../store";

import "./ActionsMenu.scss";

import soundOff from "../../../images/controls/sound-off.svg";
import soundOn from "../../../images/controls/sound-on.svg";
import rewind from "../../../images/controls/rewind.svg";
import play from "../../../images/controls/play.svg";
import pause from "../../../images/controls/pause.svg";
import repeat from "../../../images/controls/repeat.svg";
import metronome from "../../../images/controls/metronome.svg";
import tuningFork from "../../../images/controls/tuning-fork.svg";
import AccidentalsControl from "./AccidentalsControll";

const ActionsMenu = () => {
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
    <div className="top-menu no-print">
      {/* Player controls */}
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
      {/* Accidental controls */}
      <AccidentalsControl />
      {/*  Duration controls */}
      <ul className="top-menu-list duration-controls">
        <li>
          <button>
            <span className="durs whole"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs half"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs fourth"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs eighth"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs sixteenth"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs thirtysecond"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs sixtyfourth"></span>
          </button>
        </li>
        <li style={{ display: "none" }}>
          <button>
            <span className="durs onetwentyeighth"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="durs dotted"></span>
          </button>
        </li>
        <li style={{ display: "none" }}>
          <button>
            <span className="durs double-dotted"></span>
          </button>
        </li>
      </ul>
      {/* Rest controls */}
      <ul className="top-menu-list rest-controls">
        <li>
          <button>
            <span className="rests"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionsMenu;
