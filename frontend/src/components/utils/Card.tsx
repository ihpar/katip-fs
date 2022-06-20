import React from "react";
import "./Card.scss";

const Card: React.FC = ({ children }) => (
  <div className="card-wrapper">{children}</div>
);

export default Card;
