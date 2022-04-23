import { createSlice, configureStore } from "@reduxjs/toolkit";

type initialStateType = {
  soundOn: boolean;
};

const initialState: initialStateType = { soundOn: false };

const soundSlice = createSlice({
  name: "instrument",
  initialState: initialState,
  reducers: {
    toggleSound(state) {
      state.soundOn = !state.soundOn;
    },
  },
});

const store = configureStore({
  reducer: soundSlice.reducer,
});

export const soundActions = soundSlice.actions;
export default store;
export type RootState = ReturnType<typeof store.getState>;
