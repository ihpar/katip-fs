import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import noteModifierReducer from "./note-modifiers";
import languageReducer from "./language";

const store = configureStore({
  reducer: {
    player: playerReducer,
    noteModifier: noteModifierReducer,
    language: languageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
