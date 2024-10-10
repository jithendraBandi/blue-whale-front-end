import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const PlusOutlinedButton = ({ setModal }) => {
  return (
    <div style={{display:"flex", justifyContent:"flex-end"}}>
      <Button
        style={{ margin:"10px" }}
        type="primary"
        onClick={() => setModal(true)}
      >
        <PlusOutlined />
      </Button>
    </div>
  );
};

export default PlusOutlinedButton;
