import "./EditorWidget.scss";

import aa from "../../images/makamlar/aa.png";
import bes from "../../images/makamlar/bes.png";
import bey from "../../images/makamlar/bey.png";
import beyArab from "../../images/makamlar/bey-arab.png";
import { useState } from "react";

const EditorWidget: React.FC = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const accordionClickHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const accordionButtonClass = `btn-accordion ${isVisible ? "accordion-active" : ""}`;

  return (
    <div className="accordion-wrapper">
      <button className={accordionButtonClass}>
        <span className="i-sharp caret">arrow_right</span>
        Makam
      </button>
      <div className="accordion-panel" style={{ maxHeight: 224 }}>
        <div className="accordion-contents">
          <div className="content-scroller makam">
            <ul>
              <li className="widget-list-item">
                <div className="widget-makam-img">
                  <img alt="filler" src={aa} />
                </div>
                <div className="widget-makam-name">Acemaşîran</div>
              </li>
              <li className="widget-list-item">
                <div className="widget-makam-img">
                  <img alt="filler" src={aa} />
                </div>
                <div className="widget-makam-name">Acemkürdî</div>
              </li>
              <li className="widget-list-item">
                <div className="widget-makam-img">
                  <img alt="filler" src={bes} />
                </div>
                <div className="widget-makam-name">Bestenigâr</div>
              </li>
              <li className="widget-list-item">
                <div className="widget-makam-img">
                  <img alt="filler" src={bey} />
                </div>
                <div className="widget-makam-name">Beyâtî</div>
              </li>
              <li className="widget-list-item">
                <div className="widget-makam-img">
                  <img alt="filler" src={beyArab} />
                </div>
                <div className="widget-makam-name">Beyâtî Araban</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorWidget;
