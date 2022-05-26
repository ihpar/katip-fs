import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "../../hooks/use-language";
import { RootState } from "../../store";
import { themeActions } from "../../store/theme";

interface propsType {
  onSelectLanguage: () => void;
  langCode: string;
  langFlag: string;
}

const UserSettingsItems: React.FC<propsType> = (props) => {
  const { t } = useLanguage("nav-titles");
  const currTheme = useSelector<RootState, string>(state => state.theme.theme);
  const dispatch = useDispatch();

  const nextMode = currTheme === "light" ? "dark_mode" : "light_mode";
  const themeSwitcherTitle = currTheme === "light" ? t.dark_mode : t.light_mode;

  const switchThemeButtonClickHandler = () => {
    if (currTheme === "light") {
      dispatch(themeActions.setTheme("dark"));
    }
    else {
      dispatch(themeActions.setTheme("light"));
    }
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
        <button title={themeSwitcherTitle} onClick={switchThemeButtonClickHandler}>
          <span className="i-sharp md-36">{nextMode}</span>
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