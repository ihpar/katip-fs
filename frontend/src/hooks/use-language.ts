/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { useSelector } from "react-redux";
import { RootState } from "store/index";

const useLanguage = (fileName: string) => {
  const langCode = useSelector<RootState, string>(
    (state) => state.language.code,
  );

  const LANG_FILES = [
    { code: "en", texts: require(`../common/locales/en/${fileName}.json`) },
    { code: "tr", texts: require(`../common/locales/tr/${fileName}.json`) },
  ];

  const { texts } = LANG_FILES.find((f) => f.code === langCode)!;

  return {
    langCode,
    t: texts,
  };
};

export default useLanguage;
