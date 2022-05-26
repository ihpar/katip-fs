import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("tmmTheme") || "light"
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