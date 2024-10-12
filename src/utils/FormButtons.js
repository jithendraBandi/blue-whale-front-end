import { Button, Row } from "antd";

const FormButtons = ({ 
  saveText, 
  cancelText, 
  handleCancel,
  handleReset,
  saveButtonProps,
 }) => {
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "25vw",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Button danger onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button type="primary" htmlType="submit" {...saveButtonProps}>
        {saveText}
      </Button>
      {handleReset !== undefined && (
        <Button style={{color:"white", backgroundColor:"grey"}} onClick={handleReset}>Reset</Button>
      )}
    </Row>
  );
};

export default FormButtons;
