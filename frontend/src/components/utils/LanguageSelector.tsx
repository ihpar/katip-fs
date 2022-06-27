import React from "react";
import { useDispatch } from "react-redux";
import { languageActions } from "store/slices/language";
import LANGUAGES from "common/locales/Languages";

import "./LanguageSelector.scss";

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
          <button
            data-testid={`btn-lang-${lang.code}`}
            type="button"
            onClick={() => { languageButtonClickHandler(lang.code); }}
          >
            <img alt={lang.text} src={lang.flag} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
