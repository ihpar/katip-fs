import React, { useState } from "react";

type accordionProps = {
  initialVisibility?: boolean;
  title: string;
  contentHeight: number;
};

const AccordionWidget: React.FC<accordionProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(props.initialVisibility || false);

  const accordionClickHandler = () => {
    setIsVisible((visible) => !visible);
  };

  const accordionButtonClass = `btn-accordion ${isVisible ? "accordion-active" : ""}`;
  const accordionHeight = isVisible ? props.contentHeight + 24 : 0;

  return (
    <div className="accordion-wrapper">
      <button onClick={accordionClickHandler} className={accordionButtonClass}>
        <span className="i-sharp caret">arrow_right</span>
        {props.title}
      </button>
      <div className="accordion-panel" style={{ maxHeight: accordionHeight }}>
        <div className="accordion-contents">{props.children}</div>
      </div>
    </div>
  );
};

export default AccordionWidget;
