import { createSlice } from "@reduxjs/toolkit";

const initialState = { accidental: null as null | string };

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
  },
});

export const noteModifierActions = noteModifierSlice.actions;
export default noteModifierSlice.reducer;
