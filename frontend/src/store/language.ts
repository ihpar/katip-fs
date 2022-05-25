import { createSlice } from "@reduxjs/toolkit";

import flagTr from "../images/flags/tr.svg";
import flagEn from "../images/flags/en.svg";

const LANGUAGES = [
  { code: "tr", flag: flagTr },
  { code: "en", flag: flagEn },
];

const initialState = {
  code: "en",
  flag: flagEn
}

const languageSlice = createSlice({
  name: "language-slice",
  initialState: initialState,
  reducers: {
    setLenguage(state, action) {
      state.code = action.payload;
      state.flag = LANGUAGES.find(lang => lang.code === action.payload)!.flag;
    }
  }
});

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;