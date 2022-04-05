import { createSlice, configureStore } from "@reduxjs/toolkit";

type initialStateType = {
  instrument: any;
  myVar: string;
};

const initialState: initialStateType = { instrument: null, myVar: "" };

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
    dummy(state, action) {
      state.myVar = action.payload;
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
