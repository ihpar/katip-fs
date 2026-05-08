import React, { useEffect, useState } from "react";
import useLanguage from "hooks/use-language";
import USULS from "./score/Usuls";

import "./UsulWidget.scss";

interface UsulWidgetProps {
  height: number,
  filterText: string,
}

const UsulWidget: React.FC<UsulWidgetProps> = ({ height, filterText }) => {
  const [usuls, setUsuls] = useState([...USULS]);
  const { t } = useLanguage("search-field");

  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const usul = event.currentTarget.dataset.usul as string;
    event.dataTransfer.setData("text/plain", `usul:${usul}`);
  };

  useEffect(() => {
    setUsuls(USULS.filter((usul) => {
      if (filterText) {
        return usul.aliases.findIndex((alias) => alias.includes(filterText)) > -1;
      }
      return true;
    }));
  }, [filterText]);

  return (
    <div className="content-scroller" style={{ maxHeight: height }}>
      <ul>
        {usuls.map((usul) => (
          <li
            draggable="true"
            onDragStart={dragStartHandler}
            className="widget-list-item"
            data-usul={usul.id}
            key={usul.id}
          >
            <div className="widget-usul-rep">
              <div className="fraction" data-top={usul.numerator} data-bottom={usul.denominator} />
            </div>
            <div className="widget-usul-name">{usul.name}</div>
          </li>
        ))}
        {usuls.length === 0 && (
          <li>{t.no_results}</li>
        )}
      </ul>
    </div>
  );
};

export default UsulWidget;
