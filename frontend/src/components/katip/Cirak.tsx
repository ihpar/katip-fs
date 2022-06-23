import React, { useState } from "react";
import useLanguage from "hooks/use-language";
import SearchField from "components/utils/SearchField";

import "./Cirak.scss";

const Cirak = () => {
  const { t } = useLanguage("cirak");
  const [searchTerm, setSeachTerm] = useState("");

  return (
    <aside className="no-print">
      <div className="assistant accordion-wrapper">
        <div className="assistant-title">
          <span className="i-sharp assistant-title-icon">assistant</span>
          {t.apprentice}
        </div>
        <div className="assistant-body">
          <SearchField setFilter={setSeachTerm} />
          <div className="content-scroller info-section">
            {`${searchTerm}: `}
            {t.rast}
          </div>
          <a
            className="assistant-link"
            target="_blank"
            rel="noreferrer"
            href="https://tr.wikipedia.org/wiki/Rast_(makam)"
          >
            {t.continue}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Cirak;
