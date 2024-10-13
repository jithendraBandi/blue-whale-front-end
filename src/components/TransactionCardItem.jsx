import { Button, Col, Form, Row, Select } from "antd";
import FloatSelect from "../utils/FloatSelect";
import { CloseCircleFilled } from "@ant-design/icons";
import FloatInput from "../utils/FloatInput";
import { tradeTypes } from "../utils/constants";

const TransactionCardItem = ({
  activeTab,
  itemTotal,
  setItemTotal,
  index,
  itemsList,
  changeItem,
  removeTransactionItem,
  transactionForm,
}) => {
  const getItemTotal = () => {
    const quantity = transactionForm.getFieldValue(`quantity_${index}`);
    const cost = transactionForm.getFieldValue(`cost_${index}`);
    const selectedItemTotal = parseInt(quantity) * parseInt(cost);
    setItemTotal({
      ...itemTotal,
      [index]: selectedItemTotal ? selectedItemTotal : null,
    });
  };
  return (
    <div key={index} className="transaction-modal-item-details-container">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={20}>
          <Form.Item
            name={`itemValues_${index}`}
            rules={[{ required: true, message: "" }]}
          >
            <FloatSelect
              showSearch
              label="Item"
              onChange={(value) => {
                changeItem(value);
                getItemTotal();
              }}
            >
              {itemsList?.map((item) => (
                <Select.Option
                  key={item?.id}
                  value={`${item?.id}_${item?.name}_${item?.price}_${item?.category?.name}_${index}`}
                >
                  {item?.category?.name} - {item?.name} (Rs.{item?.price}/-)
                </Select.Option>
              ))}
            </FloatSelect>
          </Form.Item>
        </Col>
        {index !== 0 && (
          <Col className="gutter-row" span={4}>
            <Button
              className="transaction-modal-item-minus-button"
              onClick={() => removeTransactionItem(index)}
            >
              <CloseCircleFilled className="transaction-modal-item-minus" />
            </Button>
          </Col>
        )}
        <Col className="gutter-row" span={12}>
          <Form.Item
            name={`quantity_${index}`}
            rules={[{ required: true, message: "" }]}
          >
            <FloatInput
              onChange={getItemTotal}
              type="number"
              label="Quantity"
            />
          </Form.Item>
        </Col>
        {activeTab !== tradeTypes.USAGE && <Col className="gutter-row" span={12}>
          <Form.Item
            name={`cost_${index}`}
            rules={[{ required: true, message: "" }]}
          >
            <FloatInput
              onChange={getItemTotal}
              type="number"
              label="Cost (per unit)"
            />
          </Form.Item>
        </Col>}
      </Row>
      <span className="flex-end green-color">
        {itemTotal?.[index] ? `Rs. ${itemTotal?.[index]} /-` : null}
      </span>
    </div>
  );
};

export default TransactionCardItem;