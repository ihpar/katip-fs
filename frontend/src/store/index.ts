import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import noteModifierReducer from "./note-modifiers";

const store = configureStore({
  reducer: {
    player: playerReducer,
    noteModifier: noteModifierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
