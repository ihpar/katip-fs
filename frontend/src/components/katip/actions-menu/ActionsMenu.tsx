import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { Routes, Route } from "react-router-dom";
import { Theme } from "store/slices/theme";

import AccidentalActions from "./AccidentalActions";
import DurationActions from "./DurationActions";
import Dot from "./Dot";
import PlayerActions from "./PlayerActions";
import RestActions from "./RestActions";

import "./ActionsMenu.scss";

const ActionsMenu = () => {

  const theme = useSelector<RootState, string>(state => state.theme.theme);
  const isDark = theme === Theme.Dark;

  return (
    <div className="top-menu no-print">
      <Routes>
        <Route path="/" element={
          <>
            {/* Player controls */}
            <PlayerActions isDark={isDark} />
            {/* Accidental controls */}
            <AccidentalActions />
            {/*  Duration controls */}
            <DurationActions />
            {/* Dot */}
            <Dot />
            {/* Rest controls */}
            <RestActions isDark={isDark} />
          </>
        } />
      </Routes>
    </div>
  );
};

export default ActionsMenu;
