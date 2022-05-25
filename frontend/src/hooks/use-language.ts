import { useState } from "react";

import flagTr from "../images/flags/tr.svg";
import flagEn from "../images/flags/en.svg";
// import * as flagEn from "../images/flags/gb.svg";
// const flagEn: string = require("../images/flags/en.svg").default;

const LANGUAGES = [
  { code: "tr", flag: flagTr },
  { code: "en", flag: flagEn },
];

const useLanguage = () => {
  const defaultLanguage = "en";
  const [lang, setLang] = useState(defaultLanguage);
  const [langFlag, setLangFlag] = useState(flagEn);

  const changeLanguage = (code: string) => {
    setLang(code);
    const flag = LANGUAGES.find(lang => lang.code === code)!.flag;
    setLangFlag(flag);
  }

  return {
    lang,
    langFlag,
    changeLanguage
  }
};

export default useLanguage;