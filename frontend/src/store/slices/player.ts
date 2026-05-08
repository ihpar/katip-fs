import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  soundOn: false, playing: false, loop: false, isInstrumentCreated: false,
};

const playerSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {
    toggleSound(state) {
      state.soundOn = !state.soundOn;
      state.isInstrumentCreated = true;
    },
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    startPlaying(state) {
      state.playing = true;
    },
    stopPlaying(state) {
      state.playing = false;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
