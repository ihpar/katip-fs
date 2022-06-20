import { createSlice } from "@reduxjs/toolkit";

export enum ActionMode {
  InsertNote,
  InsertRest,
  Select,
}

export const initialState = {
  mode: ActionMode.Select,
  accidental: "",
  duration: "",
  isDotted: false,
};

const noteModifierSlice = createSlice({
  name: "note-modifier-slice",
  initialState,
  reducers: {
    changeAccidental(state, action) {
      state.accidental = action.payload;
    },
    changeDuration(state, action) {
      state.duration = action.payload;
    },
    toggleDotted(state) {
      state.isDotted = !state.isDotted;
    },
    setDotted(state) {
      state.isDotted = true;
    },
    unsetDotted(state) {
      state.isDotted = false;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const noteModifierActions = noteModifierSlice.actions;
export default noteModifierSlice.reducer;
