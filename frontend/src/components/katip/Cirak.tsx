import React from "react";
import useLanguage from "hooks/use-language";

import "./Cirak.scss";

const Cirak = () => {
  const { t } = useLanguage("cirak");

  return (
    <aside className="no-print">
      <div className="assistant accordion-wrapper">
        <div className="assistant-title">
          <span className="i-sharp assistant-title-icon">assistant</span>
          {t.apprentice}
        </div>
        <div className="assistant-body">
          <div className="search-section">
            <input type="text" className="txt-input" placeholder={t.search} />
            <span className="i-sharp search-icon">search</span>
            <br />
            <div className="text-underline" />
          </div>
          <div className="content-scroller info-section">
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
