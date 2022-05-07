import { Usul } from "../../models/Usul";
import "./UsulWidget.scss";

const usuls = [
  new Usul("nim_sofyan_2_4", "Nim Sofyan", 2, 4),
  new Usul("nim_sofyan_2_8", "Nim Sofyan", 2, 8),
  new Usul("semai_3_4", "Semâî", 3, 4),
  new Usul("semai_3_8", "Semâî", 3, 8),
  new Usul("sofyan_4_8", "Sofyan", 4, 8),
  new Usul("sofyan_4_4", "Sofyan", 4, 4),
  new Usul("sofyan_4_2", "Sofyan", 4, 2),
];

const UsulWidget: React.FC<{ height: number }> = (props) => {
  return (
    <div className="content-scroller" style={{ height: props.height }}>
      <ul>
        {usuls.map((usul) => (
          <li draggable="true" className="widget-list-item" key={usul.id}>
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
