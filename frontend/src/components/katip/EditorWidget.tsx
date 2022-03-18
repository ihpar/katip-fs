import classes from "./EditorWidget.module.scss";

const EditorWidget: React.FC = (props) => {
  return (
    <div className={classes["accordion-wrapper"]}>
      <p>Hi</p>
      {props.children}
    </div>
  );
};

export default EditorWidget;
