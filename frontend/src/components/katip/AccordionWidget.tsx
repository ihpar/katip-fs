import React, { useState } from "react";

type AccordionProps = {
  initialVisibility: boolean;
  title: string;
  expandHeight: number;
};

const AccordionWidget: React.FC<AccordionProps> = ({
  initialVisibility,
  title,
  expandHeight,
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility || false);

  const accordionClickHandler = () => {
    setIsVisible((visible) => !visible);
  };

  const accordionButtonClass = `btn-accordion ${isVisible ? "accordion-active" : ""}`;
  const accordionHeight = isVisible ? expandHeight : 0;

  return (
    <div className="accordion-wrapper">
      <button type="button" onClick={accordionClickHandler} className={accordionButtonClass}>
        <span className="i-sharp caret">arrow_right</span>
        {title}
      </button>
      <div className="accordion-panel" style={{ maxHeight: accordionHeight }}>
        <div className="accordion-contents">{children}</div>
      </div>
    </div>
  );
};

export default AccordionWidget;
