import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Theme } from "../../../store/theme";

import AccidentalsController from "./AccidentalsController";
import DurationsController from "./DurationsController";

import RestsController from "./RestsController";
import PlayerController from "./PlayerController";

import "./ActionsMenu.scss";

const ActionsMenu = () => {

  const theme = useSelector<RootState, string>(state => state.theme.theme);
  const isDark = theme === Theme.Dark;

  return (
    <div className="top-menu no-print">
      {/* Player controls */}
      <PlayerController isDark={isDark} />
      {/* Accidental controls */}
      <AccidentalsController />
      {/*  Duration controls */}
      <DurationsController />
      {/* Rest controls */}
      <RestsController isDark={isDark} />
    </div>
  );
};

export default ActionsMenu;
