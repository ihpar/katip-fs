import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "../../hooks/use-language";
import { RootState } from "../../store";
import { themeActions } from "../../store/theme";

import "./UserSettingsItems.scss";

interface propsType {
  onSelectLanguage: () => void;
  langCode: string;
  langFlag: string;
}

const UserSettingsItems: React.FC<propsType> = (props) => {

  const themeIconRef = useRef<HTMLSpanElement>(null);
  const currTheme = useSelector<RootState, string>(state => state.theme.theme);
  const dispatch = useDispatch();
  const { t } = useLanguage("nav-titles");

  const nextMode = currTheme === "light" ? "light_mode" : "dark_mode";
  const themeSwitcherTitle = currTheme === "light" ? t.dark_mode : t.light_mode;

  const switchThemeButtonClickHandler = () => {
    themeIconRef.current?.classList.add("set");
    setTimeout(() => {
      if (currTheme === "light") {
        dispatch(themeActions.setTheme("dark"));
      }
      else {
        dispatch(themeActions.setTheme("light"));
      }
      themeIconRef.current?.classList.remove("set");
    }, 400);
  };

  useEffect(() => {
    if (currTheme === "light") {
      document.body.classList.remove("dark");
    }
    else {
      document.body.classList.add("dark");
    }
  }, [currTheme]);

  return (
    <ul className="user-menu">
      <li>
        <button className="btn-theme-switcher"
          title={themeSwitcherTitle}
          onClick={switchThemeButtonClickHandler}>
          <span ref={themeIconRef} className="i-sharp md-36 theme-icon">{nextMode}</span>
        </button>
      </li>
      <li>
        <button onClick={props.onSelectLanguage} title={t.change_language}>
          <img className="flag" alt={props.langCode} src={props.langFlag} />
        </button>
      </li>
    </ul>
  );
};

export default UserSettingsItems;