import { Makam } from "../../models/Makam";

import "./MakamWidget.scss";

const definedMakams: Makam[] = [
  new Makam("acem_asiran", "Acemaşîran", "acemasiran.svg"),
  new Makam("acem_kurdi", "Acemkürdî", "acemkurdi.svg"),
  new Makam("bestenigar", "Bestenigâr", "bestenigar.svg"),
  new Makam("beyati", "Beyâtî", "beyati.svg"),
  new Makam("beyati_araban", "Beyâtî Araban", "beyati-araban.svg"),
];

const EditorWidget: React.FC<{ height: number }> = (props) => {
  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const makam = event.currentTarget.dataset.makam as string;
    event.dataTransfer.setData("text/plain", makam);
  };

  return (
    <div className="content-scroller" style={{ height: props.height }}>
      <ul>
        {definedMakams.map((makam) => (
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
