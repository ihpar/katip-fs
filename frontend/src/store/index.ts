import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import noteModifierReducer from "./note-modifiers";
import languageReducer from "./language";
import themeReducer from "./theme";

const store = configureStore({
  reducer: {
    player: playerReducer,
    noteModifier: noteModifierReducer,
    language: languageReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
