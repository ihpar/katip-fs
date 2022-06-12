import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { Routes, Route } from "react-router-dom";
import { Theme } from "store/slices/theme";

import AccidentalsController from "./old/AccidentalsController";
import DurationsController from "./old/DurationsController";
import RestsController from "./old/RestsController";
import PlayerController from "./old/PlayerController";

import AccidentalActions from "./AccidentalActions";
import DurationActions from "./DurationActions";
import PlayerActions from "./PlayerActions";

import "./ActionsMenu.scss";

const ActionsMenu = () => {

  const theme = useSelector<RootState, string>(state => state.theme.theme);
  const isDark = theme === Theme.Dark;

  return (
    <div className="top-menu no-print">
      <Routes>
        <Route path="/old" element={
          <>
            {/* Player controls */}
            <PlayerController isDark={isDark} />
            {/* Accidental controls */}
            <AccidentalsController />
            {/*  Duration controls */}
            <DurationsController />
            {/* Rest controls */}
            <RestsController isDark={isDark} />
          </>
        } />

        <Route path="/" element={
          <>
            {/* Player controls */}
            <PlayerActions isDark={isDark} />
            {/* Accidental controls */}
            <AccidentalActions />
            {/*  Duration controls */}
            <DurationActions />
            {/* Rest controls */}
            <RestsController isDark={isDark} />
          </>
        } />
      </Routes>
    </div>
  );
};

export default ActionsMenu;
