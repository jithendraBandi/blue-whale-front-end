import React, { useState } from "react";
import { Input } from "antd";
import "./index.css";
import TextArea from "antd/es/input/TextArea";
const FloatInput = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const numberRegex = /^[0-9]+$/;
  const floatRegex = /^[0-9]*\.?[0-9]*$/;


  const handleNumber = (event) => {
    if (event.key === "Backspace" || event.key === "Tab") {
      return;
    }
    if (!numberRegex.test(event.key)) {
      event.preventDefault();
    }
  };
  const handleFloatNumber = (event) => {
    if (event.key === "Backspace" || event.key === "Tab") {
      return;
    }
    if (event.key === ".") {
      if (event.target.value.includes(".")) {
        event.preventDefault();
        return;
      }
    }
    if (!floatRegex.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {type === "text" && (<Input {...props} defaultValue={value} type={type} />)}
      {type === "number" && (<Input {...props} defaultValue={value} type="text" onKeyDown={handleNumber} />)}
      {type === "float" && (<Input {...props} defaultValue={value} type="text" onKeyDown={handleFloatNumber} />)}
      {type === "text-area" && (<TextArea style={{height: "80px"}} defaultValue={value} {...props} />)}
      
      <label className={labelClass}>{isOccupied ? label : placeholder}</label>
    </div>
  );
};

export default FloatInput;
