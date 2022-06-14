import { createSlice } from "@reduxjs/toolkit";

export enum ActionMode {
  InsertNote,
  InsertRest,
  Select
}

const initialState = {
  mode: ActionMode.InsertNote,
  accidental: null as null | string,
  duration: "n8",
  isDotted: false,
  isRest: false,
  restParams: {
    value: "",
    duration: "",
  },
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
      state.isRest = false;
    },
    toggleDotted(state) {
      state.isDotted = !state.isDotted;
    },
    setRest(state, action) {
      state.isRest = true;
      state.restParams.value = action.payload.value;
      state.restParams.duration = action.payload.duration;
    },
    setMode(state, action) {
      state.mode = action.payload;
    }
  },
});

export const noteModifierActions = noteModifierSlice.actions;
export default noteModifierSlice.reducer;
