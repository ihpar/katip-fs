import React, { useRef, useState, useEffect } from "react";

interface IProps {
  initialVisibility?: boolean;
  title: string;
  contentHeight: number;
}

let accordionMaxHeight: number | undefined = 0;

const AccordionWidget: React.FC<IProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(props.initialVisibility || false);
  const [accordionHeight, setAccordionHeight] = useState<number>(0);

  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    accordionMaxHeight = accordionRef.current?.scrollHeight;
    if (accordionMaxHeight && isVisible) {
      setAccordionHeight(accordionMaxHeight);
    }
  }, [isVisible]);

  const accordionClickHandler = () => {
    setIsVisible((visible) => {
      visible = !visible;
      if (accordionMaxHeight && visible) {
        setAccordionHeight(accordionMaxHeight);
      } else {
        setAccordionHeight(0);
      }
      return visible;
    });
  };

  const accordionButtonClass = `btn-accordion ${isVisible ? "accordion-active" : ""}`;

  return (
    <div className="accordion-wrapper">
      <button onClick={accordionClickHandler} className={accordionButtonClass}>
        <span className="i-sharp caret">arrow_right</span>
        {props.title}
      </button>
      <div className="accordion-panel" ref={accordionRef} style={{ maxHeight: accordionHeight }}>
        <div className="accordion-contents">
          <div className="content-scroller" style={{ height: props.contentHeight }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionWidget;
