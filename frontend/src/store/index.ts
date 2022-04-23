import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
