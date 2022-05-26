import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import Modal from "../utils/Modal";
import LanguageSelector from "../utils/LanguageSelector";

import "./Navigation.scss";
import "../../sass/vendors/hamburger.scss";
import UserSettingsItems from "../user-menu/UserSettingsItems";

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [isKillModal, setIsKillModal] = useState(true);

  const langCode = useSelector<RootState, string>(state => state.language.code);
  const langFlag = useSelector<RootState, string>(state => state.language.flag);

  const hamburgerClickHandler = () => {
    setIsNavVisible((prev) => !prev);
  };

  const languageSelectorClickHandler = () => {
    setIsKillModal(false);
    setIsLangModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsLangModalVisible(false);
    setTimeout(() => {
      setIsKillModal(true);
    }, 250);
  };

  const userMenuClass = `user-menu-wrap ${isNavVisible ? "user-menu-visible" : ""}`;
  const hamburgerClass = `hamburger hamburger--squeeze ${isNavVisible ? "is-active" : ""}`;

  return (
    <React.Fragment>
      <Modal show={isLangModalVisible} kill={isKillModal} onClose={closeModalHandler}>
        <LanguageSelector onClose={closeModalHandler} />
      </Modal>
      <div className="no-print"></div>
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
                <button disabled>
                  <span className="i-sharp md-36">account_circle</span>
                </button>
              </li>
            </ul>
            {/* User file actions */}
            <ul className="user-menu">
              <li>
                <button disabled>
                  <span className="i-sharp md-36">note_add</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">folder_open</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">upload</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">save</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">download</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">print</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">delete_forever</span>
                </button>
              </li>
            </ul>
            {/* User action controls */}
            <ul className="user-menu">
              <li>
                <button disabled>
                  <span className="i-sharp md-36">undo</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">redo</span>
                </button>
              </li>
            </ul>
            {/* Lang, theme settings */}
            <UserSettingsItems
              langCode={langCode}
              langFlag={langFlag}
              onSelectLanguage={languageSelectorClickHandler} />
            {/* User social actions */}
            <ul className="user-menu">
              <li>
                <button disabled>
                  <span className="i-sharp md-36">share</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">help</span>
                </button>
              </li>
              <li>
                <button disabled>
                  <span className="i-sharp md-36">feedback</span>
                </button>
              </li>
            </ul>
            {/* User logout */}
            <ul className="user-menu">
              <li>
                <button disabled>
                  <span className="i-sharp md-36">logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="no-print"></div>
    </React.Fragment>
  );
};

export default Navigation;
