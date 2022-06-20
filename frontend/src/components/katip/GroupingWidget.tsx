import React from "react";
import "./GroupingWidget.scss";

const GroupingWidget = () => (
  <div className="accordion-buttons-grid grid-3">
    <button type="button">
      <span className="i-sharp">auto_fix_high</span>
      <span className="widget-icon-button-text">Oto</span>
    </button>
    <button type="button">
      <span className="mus">&#x266A;</span>
    </button>
    <button type="button">
      <span className="mus">&#x266B;</span>
    </button>
  </div>
);

export default GroupingWidget;
