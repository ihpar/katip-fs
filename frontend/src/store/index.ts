import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/player";
import noteModifierReducer from "./slices/note-modifiers";
import languageReducer from "./slices/language";
import themeReducer from "./slices/theme";

const store = configureStore({
  reducer: {
    player: playerReducer,
    noteModifier: noteModifierReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
