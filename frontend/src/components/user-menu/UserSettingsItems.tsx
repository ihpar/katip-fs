import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "../../hooks/use-language";
import { RootState } from "../../store";
import { themeActions, Theme } from "../../store/slices/theme";

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

  const nextMode = currTheme === Theme.Light ? "light_mode" : "dark_mode";
  const themeSwitcherTitle = currTheme === Theme.Light ? t.dark_mode : t.light_mode;

  const switchThemeButtonClickHandler = () => {
    themeIconRef.current?.classList.add("set");
    setTimeout(() => {
      if (currTheme === Theme.Light) {
        dispatch(themeActions.setTheme(Theme.Dark));
      }
      else {
        dispatch(themeActions.setTheme(Theme.Light));
      }
      themeIconRef.current?.classList.remove("set");
    }, 400);
  };

  useEffect(() => {
    if (currTheme === Theme.Light) {
      document.body.classList.remove(Theme.Dark);
    }
    else {
      document.body.classList.add(Theme.Dark);
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