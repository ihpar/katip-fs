import { createSlice, configureStore } from "@reduxjs/toolkit";

type initialStateType = {
  instrument: any;
};

const initialState: initialStateType = { instrument: null };

const soundSlice = createSlice({
  name: "instrument",
  initialState: initialState,
  reducers: {
    setInstrument(state, action) {
      state.instrument = action.payload;
    },
    playSound(state, action) {
      state.instrument.start(action.payload.pitch, 0, { duration: action.payload.dur });
    },
  },
});

const store = configureStore({
  reducer: soundSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const soundActions = soundSlice.actions;
export default store;
