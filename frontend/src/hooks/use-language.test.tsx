import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import store from "store/index";
import "@testing-library/jest-dom";

import useLanguage from "./use-language";

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

describe("useLanguage custom hook", () => {
  test("works correctly", () => {
    const { result } = renderHook(
      () => useLanguage("search-field"),
      { wrapper: Wrapper },
    );
    const { t } = result.current;
    expect(t.search).toEqual("Search");
  });
});
