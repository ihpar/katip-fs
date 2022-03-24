import React, { useState } from "react";

import "./Navigation.scss";
import "../../sass/vendors/hamburger.scss";

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

  const hamburgerClickHandler = () => {
    setIsNavVisible((prev) => !prev);
  };

  const userMenuClass = `user-menu-wrap ${isNavVisible ? "user-menu-visible" : ""}`;
  const hamburgerClass = `hamburger hamburger--squeeze ${isNavVisible ? "is-active" : ""}`;

  return (
    <React.Fragment>
      <div className="no-print"></div>
      <div>
        <header id="header-menu" className="header-section no-print">
          <div>
            <button onClick={hamburgerClickHandler} className={hamburgerClass} type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>

          <div className="user-menu-clipper">
            <div className={userMenuClass}>
              {/* User account actions */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">account_circle</span>
                  </button>
                </li>
              </ul>
              {/* User file actions */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">note_add</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">folder_open</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">upload</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">save</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">download</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">print</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">delete_forever</span>
                  </button>
                </li>
              </ul>
              {/* User action controls */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">undo</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">redo</span>
                  </button>
                </li>
              </ul>
              {/* User setting actions */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">dark_mode</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">light_mode</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">flag</span>
                  </button>
                </li>
              </ul>
              {/* User social actions */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">share</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">help</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="i-sharp md-36">feedback</span>
                  </button>
                </li>
              </ul>
              {/* User logout */}
              <ul className="user-menu">
                <li>
                  <button>
                    <span className="i-sharp md-36">logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
      <div className="no-print"></div>
    </React.Fragment>
  );
};

export default Navigation;
