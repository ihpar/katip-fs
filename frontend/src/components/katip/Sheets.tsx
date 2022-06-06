import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Theme } from "../../store/theme";

import Score from "./score/Score";

import "./Sheet.scss";

let score: Score;
const Sheets = () => {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  useEffect(() => {
    score = new Score("svg-root");
  }, []);

  useEffect(() => {
    score.setTheme(theme);
    score.drawTests();
  }, [theme]);

  useEffect(() => {
    score.drawTests();
  }, []);

  return (
    <div>
      <div id="svg-root"></div>
    </div>
  );
};

export default Sheets;