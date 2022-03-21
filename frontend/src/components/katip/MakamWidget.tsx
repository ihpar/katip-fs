import aa from "../../images/makamlar/aa.png";
import bes from "../../images/makamlar/bes.png";
import bey from "../../images/makamlar/bey.png";
import beyArab from "../../images/makamlar/bey-arab.png";

const EditorWidget: React.FC<{ height: number }> = (props) => {
  return (
    <div className="content-scroller" style={{ height: props.height }}>
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
  );
};

export default EditorWidget;
