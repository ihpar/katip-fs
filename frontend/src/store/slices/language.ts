import { createSlice } from "@reduxjs/toolkit";

import flagTr from "../../static/images/flags/tr.svg";
import flagEn from "../../static/images/flags/en.svg";

const LANGUAGES = [
  { code: "tr", flag: flagTr },
  { code: "en", flag: flagEn },
];

const initialState = {
  code: localStorage.getItem("tmmLang") || "en",
  flag: localStorage.getItem("tmmLang") === "tr" ? flagTr : flagEn,
};

const languageSlice = createSlice({
  name: "language-slice",
  initialState: initialState,
  reducers: {
    setLenguage(state, action) {
      state.code = action.payload;
      state.flag = LANGUAGES.find((lang) => lang.code === action.payload)!.flag;
      localStorage.setItem("tmmLang", action.payload);
    },
  },
});

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
