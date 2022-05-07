import { ALL_USULS } from "./sheet/constants";

import "./UsulWidget.scss";

const UsulWidget: React.FC<{ height: number }> = (props) => {
  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const usul = event.currentTarget.dataset.usul as string;
    event.dataTransfer.setData("text/plain", "usul:" + usul);
  };

  return (
    <div className="content-scroller" style={{ height: props.height }}>
      <ul>
        {ALL_USULS.map((usul) => (
          <li
            draggable="true"
            onDragStart={dragStartHandler}
            className="widget-list-item"
            data-usul={usul.id}
            key={usul.id}
          >
            <div className="widget-usul-rep">
              <div className="fraction" data-top={usul.numerator} data-bottom={usul.denominator}></div>
            </div>
            <div className="widget-usul-name">{usul.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsulWidget;
