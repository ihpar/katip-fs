import { ALL_MAKAMS } from "./sheet/constants";
import { Theme } from "store/slices/theme";

import "./MakamWidget.scss";

const MakamWidget: React.FC<{ height: number; theme: string; }> = (props) => {

  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const makam = event.currentTarget.dataset.makam as string;
    event.dataTransfer.setData("text/plain", "makam:" + makam);
  };

  const isDark = props.theme === Theme.Dark;

  return (
    <div className="content-scroller" style={{ height: props.height }}>
      <ul>
        {ALL_MAKAMS.map((makam) => (
          <li
            draggable="true"
            onDragStart={dragStartHandler}
            key={makam.name}
            data-makam={makam.id}
            className="widget-list-item"
          >
            <div className="widget-makam-img">
              <img draggable="false"
                alt={makam.name}
                src={
                  isDark ?
                    require(`static/images/makamlar/${makam.iconDark}`) :
                    require(`static/images/makamlar/${makam.icon}`)
                } />
            </div>
            <div className="widget-makam-name">{makam.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakamWidget;
