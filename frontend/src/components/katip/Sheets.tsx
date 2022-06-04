import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { Theme } from "@/store/slices/theme";

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
    score.drawRect();
  }, [theme]);

  useEffect(() => {
    score.drawRect();
  }, []);

  return (
    <div>
      <div id="svg-root"></div>
    </div>
  );
};

export default Sheets;