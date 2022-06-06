import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Theme } from "../../store/theme";

import Score from "./score/Score";

import "./Sheets.scss";

let score: Score;
const Sheets = () => {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  useEffect(() => {
    score = new Score("score-root", 2);
  }, []);

  useEffect(() => {
    score.setTheme(theme);
    // score.drawTests();
  }, [theme]);

  useEffect(() => {
    // score.drawTests();
  }, []);

  return (
    <div id="score-root"></div>
  );
};

export default Sheets;