import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

const initialState = {
  theme: localStorage.getItem("tmmTheme") as Theme || Theme.Light
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("tmmTheme", action.payload);
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;