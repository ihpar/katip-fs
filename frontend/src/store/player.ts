import { createSlice } from "@reduxjs/toolkit";

const initialState = { soundOn: false, playing: false, loop: false };

const playerSlice = createSlice({
  name: "instrument",
  initialState: initialState,
  reducers: {
    toggleSound(state) {
      state.soundOn = !state.soundOn;
    },
    startPlaying(state) {
      state.playing = true;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
