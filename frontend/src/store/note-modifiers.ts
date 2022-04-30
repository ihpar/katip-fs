import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accidental: null as null | string,
  duration: "n8",
  isDotted: false,
};

const noteModifierSlice = createSlice({
  name: "note-modifier-slice",
  initialState: initialState,
  reducers: {
    changeAccidental(state, action) {
      if (state.accidental === action.payload) {
        state.accidental = null;
      } else {
        state.accidental = action.payload;
      }
    },
    changeDuration(state, action) {
      state.duration = action.payload;
    },
    toggleDotted(state) {
      state.isDotted = !state.isDotted;
    },
  },
});

export const noteModifierActions = noteModifierSlice.actions;
export default noteModifierSlice.reducer;
