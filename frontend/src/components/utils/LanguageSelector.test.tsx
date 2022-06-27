import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "store/index";
import LANGUAGES from "common/locales/Languages";

import LanguageSelector from "./LanguageSelector";

describe("LanguageSelector component", () => {
  test("changes the language correctly", () => {
    render(
      <Provider store={store}>
        <LanguageSelector onClose={() => { }} />
      </Provider>,
    );
    LANGUAGES.forEach((language) => {
      const button = screen.getByTestId(`btn-lang-${language.code}`);
      userEvent.click(button);
      expect(store.getState().language.code).toEqual(language.code);
    });
  });
});
