import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import store from "store/index";

import SearchField from "./SearchField";

describe("SearchField component", () => {
  test("renders search input", () => {
    render(
      <Provider store={store}>
        <SearchField setFilter={() => { }} />
      </Provider>,
    );

    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders search input seach icon as default", () => {
    render(
      <Provider store={store}>
        <SearchField setFilter={() => { }} />
      </Provider>,
    );

    const iconElement = screen.getByRole("button");
    expect(iconElement).toHaveClass("i-sharp search-icon");
  });

  test("renders search input clear icon when input text changes", () => {
    render(
      <Provider store={store}>
        <SearchField setFilter={() => { }} />
      </Provider>,
    );

    const inputElement = screen.getByRole("searchbox");
    userEvent.click(inputElement);
    userEvent.keyboard("test");
    const iconElement = screen.getByRole("button");
    expect(iconElement).toHaveClass("i-sharp close-icon");
  });

  test("handles clear icon click correctly", () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SearchField setFilter={() => { }} />
      </Provider>,
    );

    const inputElement = screen.getByRole("searchbox");
    userEvent.click(inputElement);
    userEvent.keyboard("test");
    jest.runAllTimers();
    const iconElement = screen.getByRole("button");
    userEvent.click(iconElement);
    expect(inputElement).toHaveValue("");
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("does NOT render search search icon when input text changes", () => {
    render(
      <Provider store={store}>
        <SearchField setFilter={() => { }} />
      </Provider>,
    );

    const inputElement = screen.getByRole("searchbox");
    userEvent.click(inputElement);
    userEvent.keyboard("test");
    const iconElement = screen.getByRole("button");
    expect(iconElement).not.toHaveClass("i-sharp search-icon");
  });

  test("handles text change event correctly", () => {
    jest.useFakeTimers();
    let returnedText = "";
    const filterHandler = (text: string) => {
      returnedText = text;
    };

    render(
      <Provider store={store}>
        <SearchField setFilter={filterHandler} />
      </Provider>,
    );

    const inputElement = screen.getByRole("searchbox");
    userEvent.click(inputElement);
    const testStr = "text";
    userEvent.keyboard(testStr);
    jest.runAllTimers();
    expect(returnedText).toEqual(testStr);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
