import "./ActionsMenu.scss";

import AccidentalsController from "./AccidentalsController";
import DurationsController from "./DurationsController";

import RestsController from "./RestsController";
import PlayerController from "./PlayerController";

const ActionsMenu = () => {
  return (
    <div className="top-menu no-print">
      {/* Player controls */}
      <PlayerController />
      {/* Accidental controls */}
      <AccidentalsController />
      {/*  Duration controls */}
      <DurationsController />
      {/* Rest controls */}
      <RestsController />
    </div>
  );
};

export default ActionsMenu;
