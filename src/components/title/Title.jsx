import React from "react";
import "./title.scss";

const Title = ({ title, text }) => {
  return (
    <p className="title">
      <span>{title}</span> {text}
    </p>
  );
};

export default Title;
