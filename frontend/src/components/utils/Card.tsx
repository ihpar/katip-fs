import "./Card.scss";

const Card: React.FC = (props) => {
  return (
    <div className="card-wrapper">{props.children}</div>
  );
};

export default Card;