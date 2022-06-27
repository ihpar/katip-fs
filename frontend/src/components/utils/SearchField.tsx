import React, { useRef, useState } from "react";
import useLanguage from "hooks/use-language";

import "./SearchField.scss";

interface SearchFieldProps {
  placeholder?: string;
  setFilter: (text: string) => void;
}

let timer: NodeJS.Timeout;
const DEBOUNCE_INTERVAL = 200;

const SearchField: React.FC<SearchFieldProps> = ({ placeholder = "search", setFilter }) => {
  const { t } = useLanguage("search-field");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    setFilter("");
    setInputVal("");
    inputRef.current?.focus();
  };

  const [actionIcons] = useState([
    <span
      role="button"
      className="i-sharp search-icon"
    >
      search
    </span>,
    <span
      onClick={clearSearch}
      onKeyDown={clearSearch}
      role="button"
      tabIndex={0}
      className="i-sharp close-icon"
    >
      close
    </span>,
  ]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    const text = event.target.value.toLocaleLowerCase("tr");
    setInputVal(text);

    timer = setTimeout(() => {
      setFilter(text);
    }, DEBOUNCE_INTERVAL);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        role="searchbox"
        className="txt-input"
        placeholder={t[placeholder]}
        onChange={inputChangeHandler}
        value={inputVal}
        ref={inputRef}
      />
      {inputVal.length > 0 ? actionIcons[1] : actionIcons[0]}
      <div className="text-underline" />
    </div>
  );
};

SearchField.defaultProps = {
  placeholder: "search",
};

export default SearchField;
