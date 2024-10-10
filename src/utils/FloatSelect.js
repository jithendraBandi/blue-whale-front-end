import React, { useState } from "react";
import { Select } from "antd";
import "./index.css";

const FloatSelect = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, placeholder, required, children } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (props.value && props.value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  // const requiredMark = required ? <span className="text-danger">*</span> : null;

  const rules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <div
      className="float-label"
      
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Select rules={rules} {...props} allowClear>
        {children}
      </Select>
      <label className={labelClass}>
        {isOccupied ? label : placeholder} 
      </label>
    </div>
  );
};

export default FloatSelect;
