import { useSelector } from "react-redux";
import { RootState } from "../store";

const useLanguage = (fileName: string) => {
  const langCode = useSelector<RootState, string>(state => state.language.code);

  const LANG_FILES = [
    { code: "en", texts: require(`../locales/en/${fileName}.json`) },
    { code: "tr", texts: require(`../locales/tr/${fileName}.json`) }
  ];

  const texts = LANG_FILES.find(f => f.code === langCode)!.texts;

  return {
    langCode: langCode,
    t: texts
  }
};

export default useLanguage;