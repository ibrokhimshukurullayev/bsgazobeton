import React from "react";
import "./button.scss";

const Button = ({ title, onClick }) => {
  return (
    <button className="button__components" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
