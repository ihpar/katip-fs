import { ALL_MAKAMS } from "./sheet/constants";

import "./MakamWidget.scss";

const EditorWidget: React.FC<{ height: number }> = (props) => {
  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const makam = event.currentTarget.dataset.makam as string;
    event.dataTransfer.setData("text/plain", makam);
  };

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
              <img draggable="false" alt={makam.name} src={require(`../../images/makamlar/${makam.icon}`)} />
            </div>
            <div className="widget-makam-name">{makam.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditorWidget;
