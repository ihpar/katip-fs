import React from "react";
import useLanguage from "hooks/use-language";

import "./SearchField.scss";

interface SearchFieldProps {
  placeholder?: string;
  setFilter: (text: string) => void;
}

let timer: NodeJS.Timeout;
const DEBOUNCE_INTERVAL = 250;

const SearchField: React.FC<SearchFieldProps> = ({ placeholder = "search", setFilter }) => {
  const { t } = useLanguage("search-field");

  const inputChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setFilter(ev.target.value.toLocaleLowerCase("tr"));
    }, DEBOUNCE_INTERVAL);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        className="txt-input"
        placeholder={t[placeholder]}
        onChange={inputChangeHandler}
      />
      <span className="i-sharp search-icon">search</span>
      <div className="text-underline" />
    </div>
  );
};

SearchField.defaultProps = {
  placeholder: "search",
};

export default SearchField;
