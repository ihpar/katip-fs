import { DragEvent } from "react";
import "./MakamWidget.scss";

import Makam from "../../models/makam";

const definedMakams: Makam[] = [
  new Makam("Acemaşîran", "aa.png"),
  new Makam("Acemkürdî", "aa.png"),
  new Makam("Bestenigâr", "bes.png"),
  new Makam("Beyâtî", "bey.png"),
  new Makam("Beyâtî Araban", "bey-arab.png"),
];

const EditorWidget: React.FC<{ height: number }> = (props) => {
  const dragStartHandler = (e: DragEvent<HTMLLIElement>) => {
    console.log("drag started");
  };

  return (
    <div className="content-scroller" style={{ height: props.height }}>
      <ul>
        {definedMakams.map((makam) => (
          <li draggable onDragStart={dragStartHandler} key={makam.name} className="widget-list-item">
            <div className="widget-makam-img">
              <img alt="filler" src={require(`../../images/makamlar/${makam.icon}`)} />
            </div>
            <div className="widget-makam-name">{makam.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditorWidget;
