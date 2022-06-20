import React from "react";
import MAKAMS from "./score/Makams";

import "./MakamWidget.scss";

const MakamWidget: React.FC<{ height: number; }> = ({
  height,
}) => {
  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const makam = event.currentTarget.dataset.makam as string;
    event.dataTransfer.setData("text/plain", `makam:${makam}`);
  };

  return (
    <div className="content-scroller" style={{ height }}>
      <ul>
        {MAKAMS.map((makam) => (
          <li
            draggable="true"
            onDragStart={dragStartHandler}
            key={makam.name}
            data-makam={makam.id}
            className="widget-list-item"
          >
            <div className={`widget-makam-img ${makam.accidentals.map((acci) => acci.replace(/\+|:|-/g, "")).join("-")}`} />
            <div className="widget-makam-name">{makam.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakamWidget;
