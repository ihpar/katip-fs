import "./EditorWidget.scss";

const EditorWidget: React.FC = (props) => {
  return (
    <div className="accordion-wrapper">
      <button className="btn-accordion accordion-active">
        <span className="i-sharp caret">arrow_right</span>
        Makam
      </button>
      <div className="accordion-panel">
        <div className="accordion-contents">
          <div className="content-scroller makam">Lorem ipsum dolor sit amet.</div>
        </div>
      </div>
    </div>
  );
};

export default EditorWidget;
