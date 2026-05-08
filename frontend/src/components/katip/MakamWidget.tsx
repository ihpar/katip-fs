import React, { useEffect, useState } from "react";
import useLanguage from "hooks/use-language";
import MAKAMS from "./score/Makams";

import "./MakamWidget.scss";

interface MakamWidgetProps {
  height: number,
  filterText: string,
}

const MakamWidget: React.FC<MakamWidgetProps> = ({
  height,
  filterText,
}) => {
  const [makams, setMakams] = useState([...MAKAMS]);
  const { t } = useLanguage("search-field");

  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const makam = event.currentTarget.dataset.makam as string;
    event.dataTransfer.setData("text/plain", `makam:${makam}`);
  };

  useEffect(() => {
    setMakams(MAKAMS.filter((makam) => {
      if (filterText) {
        return makam.aliases.findIndex((alias) => alias.includes(filterText)) > -1;
      }
      return true;
    }));
  }, [filterText]);

  return (
    <div className="content-scroller" style={{ maxHeight: height }}>
      <ul>
        {makams.map((makam) => (
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
        {makams.length === 0 && (
          <li>{t.no_results}</li>
        )}
      </ul>
    </div>
  );
};

export default MakamWidget;
