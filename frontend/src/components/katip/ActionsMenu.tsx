import { useState } from "react";
import { useDispatch } from "react-redux";
import { soundActions } from "../../store";

import "./ActionsMenu.scss";

import Soundfont from "soundfont-player";

import soundOff from "../../images/controls/sound-off.svg";
import soundOn from "../../images/controls/sound-on.svg";
import rewind from "../../images/controls/rewind.svg";
import play from "../../images/controls/play.svg";
import repeat from "../../images/controls/repeat.svg";
import metronome from "../../images/controls/metronome.svg";
import tuningFork from "../../images/controls/tuning-fork.svg";

const ActionsMenu = () => {
  const dispatch = useDispatch();

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [instrumentCreated, setInstrumentCreated] = useState(false);

  const soundButtonClickHandler = () => {
    setIsSoundOn((prevSound) => {
      if (!instrumentCreated) {
        Soundfont.instrument(new AudioContext(), "acoustic_grand_piano", { soundfont: "FluidR3_GM", gain: 8 })
          .then((ins: any) => {
            dispatch(soundActions.setInstrument(ins));
            dispatch(soundActions.playSound({ pitch: "A4", dur: 0.5 }));
            setInstrumentCreated(true);
          })
          .catch((err: any) => console.log("Sound font error!", err));
      }

      return !prevSound;
    });
  };

  return (
    <div className="top-menu no-print">
      {/* Player controls */}
      <ul className="top-menu-list player-controls">
        <li>
          <button onClick={soundButtonClickHandler}>
            <img alt="filler" className="img-ht" src={isSoundOn ? soundOn : soundOff} />
          </button>
        </li>
        <li>
          <button>
            <img alt="filler" className="img-ht" src={rewind} />
          </button>
        </li>
        <li>
          <button>
            <img alt="filler" className="img-ht" src={play} />
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
      <ul className="top-menu-list accidental-controls">
        <li>
          <button>
            <span className="acci bekar"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci fazla-bemol"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci bakiyye-bemol"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci k-mucennep-bemol"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci b-mucennep-bemol"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci tanini-bemol"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci fazla-diyez"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci bakiyye-diyez"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci k-mucennep-diyez"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci b-mucennep-diyez"></span>
          </button>
        </li>
        <li>
          <button>
            <span className="acci tanini-diyez"></span>
          </button>
        </li>
      </ul>
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
