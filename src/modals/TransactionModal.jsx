import { Button, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { errorNotification, tradeTypes } from "../utils/constants";
import axios from "axios";
import { SAVE_TRANSACTION } from "../utils/apis";
import FloatInput from "../utils/FloatInput";
import FormButtons from "../utils/FormButtons";
import dayjs from "dayjs";
import FloatSelect from "../utils/FloatSelect";
import "./modals.css";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";

const TransactionModal = ({
  transactionModal,
  setTransactionModal,
  transactionRecord,
  setTransactionRecord,
  itemsList,
  getTransactionsList,
  getItemsList,
  activeTab,
  setActiveTab,
}) => {
  const [transactionForm] = Form.useForm();
  const [transactionItemsList, setTransactionItemsList] = useState([0]);

  useEffect(() => {
    if (!transactionRecord) {
        transactionForm.setFieldValue("tradeType", activeTab);
        return;
    }
    if (transactionRecord?.date && transactionRecord?.date !== "") {
      const transactionDate = dayjs(transactionRecord?.date, "DD-MM-YYYY");
      transactionForm.setFieldValue("date", transactionDate);
    }
    let transactionItemsList = [];
    transactionRecord?.transactionItemDetails?.forEach((itemDetails, index) => {
      transactionItemsList.push(index);
      transactionForm.setFieldValue(`itemName_${index}`, itemDetails?.itemName);
      transactionForm.setFieldValue(`quantity_${index}`, itemDetails?.quantity);
      transactionForm.setFieldValue(`cost_${index}`, itemDetails?.cost);
    });
    setTransactionItemsList(transactionItemsList);

    transactionForm.setFieldsValue({
      id: transactionRecord?.id,
      name: transactionRecord?.name,
      mobileNumber: transactionRecord?.mobileNumber,
      address: transactionRecord?.address,
      tradeType: transactionRecord?.tradeType,
    });
  }, [transactionRecord, transactionForm]);

  const confirmModal = (values) => {
    let amount = 0;
    let transactionItemDetails = [];

    transactionItemsList?.forEach((itemIndex) => {
      const itemId = itemsList?.find(
        (item) => item?.name === values?.[`itemName_${itemIndex}`]
      )?.id;
      const itemDetails = {
        itemId,
        itemName: values?.[`itemName_${itemIndex}`],
        quantity: values?.[`quantity_${itemIndex}`],
        cost: values?.[`cost_${itemIndex}`],
      };
      transactionItemDetails.push(itemDetails);
      amount += parseInt(values?.[`cost_${itemIndex}`]) * parseInt(values?.[`quantity_${itemIndex}`]);
    });

    Modal.confirm({
      title: "Confirm Transaction",
      content: (
        <span>
          The total amount is <strong>Rs.{amount}/-</strong>
        </span>
      ),
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        onFinish(values, transactionItemDetails, amount);
      },
    });
  };

  const onFinish = (values, transactionItemDetails, amount) => {
    if (values?.name?.trim() === "") {
      errorNotification("Name should not be empty");
      return;
    }
    const transactionDate = dayjs(values?.date).format("DD-MM-YYYY");

    let payload = {
      date: transactionDate,
      name: values?.name,
      mobileNumber: values?.mobileNumber,
      address: values?.address,
      amount,
      tradeType: values?.tradeType,
      transactionItemDetails,
    };
    if (values?.id) {
      payload.id = values?.id;
    }
    axios
      .post(SAVE_TRANSACTION, payload)
      .then((response) => {
        setActiveTab(payload?.tradeType);
        getItemsList();
        getTransactionsList();
        handleCancel();
      })
      .catch((error) => {});
  };

  const handleCancel = () => {
    setTransactionModal(false);
    setTransactionRecord?.(null);
    transactionForm.resetFields();
  };

  const addTransactionItem = () => {
    const lastIndex = transactionItemsList[transactionItemsList.length - 1];
    setTransactionItemsList([...transactionItemsList, lastIndex + 1]);
  };

  const removeTransactionItem = (index) => {
    const filteredTransactionItemsList = transactionItemsList?.filter(
      (itemIndex) => itemIndex !== index
    );
    setTransactionItemsList(filteredTransactionItemsList);
  };

  const getItemsCard = (index) => {
    return (
      <div key={index} className="transaction-modal-item-details-container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={20}>
            <Form.Item
              name={`itemName_${index}`}
              rules={[{ required: true, message: "" }]}
            >
              <FloatSelect showSearch label="Item">
                {itemsList?.map((item) => (
                  <Select.Option key={item?.id} value={item?.name}>
                    {item?.name} ({item?.price}/-) {item?.category?.name}
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
              <FloatInput type="number" label="Quantity" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name={`cost_${index}`}
              rules={[{ required: true, message: "" }]}
            >
              <FloatInput type="number" label="Cost (per piece)" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Modal
      //   title={transactionRecord ? "Edit Transaction" : "Add Transaction"}
      title={
        <div className="space-between side-margins">
          <span>
            {transactionRecord ? "Edit Transaction" : "Add Transaction"}
          </span>
          <Button type="primary" onClick={addTransactionItem}>
            <PlusOutlined />
          </Button>
        </div>
      }
      open={transactionModal}
      onCancel={handleCancel}
      width={1000}
      closable={false}
      styles={{
        body: {
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        },
      }}
      centered
      footer={null}
    >
      <Form name="itemForm" form={transactionForm} onFinish={confirmModal}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="first-row-margin-top"
        >
          <Col className="gutter-row" span={4}>
            <Form.Item name="id">
              <FloatInput disabled type="number" label="Transaction Id" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={10}>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <FloatInput type="text" label="Name" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={10}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "" }]}
            >
              <DatePicker className="full-width" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="tradeType"
              rules={[{ required: true, message: "" }]}
            >
              <FloatSelect disabled label="Trade Type">
                <Select.Option value={tradeTypes.SELL}>
                  {tradeTypes.SELL}
                </Select.Option>
                <Select.Option value={tradeTypes.BUY}>
                  {tradeTypes.BUY}
                </Select.Option>
              </FloatSelect>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="mobileNumber"
              rules={[
                // {
                //   required: true,
                //   message: "",
                // },
                {
                  len: 10,
                  message: "",
                },
              ]}
            >
              <FloatInput type="number" label="Mobile Number" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="address"
              // rules={[{ required: true, message: "" }]}
            >
              <FloatInput type="text" label="Address" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex-row transaction-modal-items-container">
          {transactionItemsList?.map((index) => getItemsCard(index))}
        </div>

        {/* <Col className="gutter-row" span={24}>
          <Form.Item name="amount">
            <FloatInput disabled type="number" label="Total Amount" />
          </Form.Item>
        </Col> */}

        <FormButtons
          saveText="Submit"
          cancelText="Cancel"
          handleCancel={handleCancel}
        />
      </Form>
    </Modal>
  );
};

export default TransactionModal;
