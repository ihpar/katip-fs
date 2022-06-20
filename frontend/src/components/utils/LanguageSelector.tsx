import React from "react";
import { languageActions } from "store/slices/language";
import flagTr from "static/images/flags/tr.svg";
import flagEn from "static/images/flags/en.svg";

import "./LanguageSelector.scss";
import { useDispatch } from "react-redux";

const LANGUAGES = [
  { code: "tr", text: "Türkçe", flag: flagTr },
  { code: "en", text: "English", flag: flagEn },
];

const LanguageSelector: React.FC<{ onClose: () => void; }> = ({
  onClose,
}) => {
  const dispatch = useDispatch();

  const languageButtonClickHandler = (langCode: string) => {
    dispatch(languageActions.setLenguage(langCode));
    onClose();
  };

  return (
    <div className="language-selector-wrap">
      {LANGUAGES.map((lang) => (
        <div className="lang-selector-button-wrap" key={lang.code}>
          <button type="button" onClick={() => { languageButtonClickHandler(lang.code); }}>
            <img alt={lang.text} src={lang.flag} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
