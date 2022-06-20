import React from "react";
import { Routes, Route } from "react-router-dom";

import AccidentalActions from "./AccidentalActions";
import DurationActions from "./DurationActions";
import Dot from "./Dot";
import PlayerActions from "./PlayerActions";
import RestActions from "./RestActions";

import "./ActionsMenu.scss";

const ActionsMenu = () => (
  <div className="top-menu no-print">
    <Routes>
      <Route
        path="/"
        element={(
          <>
            {/* Player controls */}
            <PlayerActions />
            {/* Accidental controls */}
            <AccidentalActions />
            {/*  Duration controls */}
            <DurationActions />
            {/* Dot */}
            <Dot />
            {/* Rest controls */}
            <RestActions />
          </>
        )}
      />
    </Routes>
  </div>
);

export default ActionsMenu;
