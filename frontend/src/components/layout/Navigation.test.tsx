import React, { ReactNode, ReactPortal } from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import store from "store/index";

import Navigation from "./Navigation";

describe("Navigation component", () => {
  const oldCreatePortal = ReactDOM.createPortal;
  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  test("renders theme selector button correctly", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>,
    );
    const themeSelectorButton = screen.getByTestId("btn-theme-switcher");
    expect(themeSelectorButton).toBeInTheDocument();
  });

  test("renders locale selector button correctly", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>,
    );
    const localeSelectorButton = screen.getByTestId("btn-locale-displayer");
    expect(localeSelectorButton).toBeInTheDocument();
  });

  test("displays language selector modal after language selector button is clicked", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>,
    );
    const localeSelectorButton = screen.getByTestId("btn-locale-displayer");
    userEvent.click(localeSelectorButton);

    const modalCard = screen.getByTestId("modal-content-wrapper");
    expect(modalCard).toBeInTheDocument();
  });
});
