import { Button, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { errorNotification, successNotification, tradeTypes } from "../utils/constants";
import axios from "axios";
import { SAVE_TRANSACTION } from "../utils/apis";
import FloatInput from "../utils/FloatInput";
import FormButtons from "../utils/FormButtons";
import dayjs from "dayjs";
import FloatSelect from "../utils/FloatSelect";
import "./modals.css";
import { PlusOutlined } from "@ant-design/icons";
import TransactionCardItem from "../components/TransactionCardItem";
import { ACTION_SUCCESSFULL_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../utils/stringConstants";

const TransactionModal = ({
  transactionModal,
  setTransactionModal,
  // transactionRecord,
  // setTransactionRecord,
  itemsList,
  getTransactionsList,
  getItemsList,
  activeTab,
  setActiveTab,
}) => {
  const [transactionForm] = Form.useForm();
  const [transactionItemsList, setTransactionItemsList] = useState([0]);
  const [itemTotal, setItemTotal] = useState({});

  useEffect(() => {
    transactionForm.setFieldValue("tradeType", activeTab);
  }, [activeTab, transactionForm])

  // useEffect(() => {
  //   if (!transactionRecord) {
  //       transactionForm.setFieldValue("tradeType", activeTab);
  //       return;
  //   }
  //   if (transactionRecord?.date && transactionRecord?.date !== "") {
  //     const transactionDate = dayjs(transactionRecord?.date, "DD-MM-YYYY");
  //     transactionForm.setFieldValue("date", transactionDate);
  //   }
  //   let transactionItemsList = [];
  //   transactionRecord?.transactionItemDetails?.forEach((itemDetails, index) => {
  //     transactionItemsList.push(index);
  //     transactionForm.setFieldValue(`itemName_${index}`, itemDetails?.itemName);
  //     transactionForm.setFieldValue(`quantity_${index}`, itemDetails?.quantity);
  //     transactionForm.setFieldValue(`cost_${index}`, itemDetails?.cost);
  //   });
  //   setTransactionItemsList(transactionItemsList);

  //   transactionForm.setFieldsValue({
  //     id: transactionRecord?.id,
  //     name: transactionRecord?.name,
  //     mobileNumber: transactionRecord?.mobileNumber,
  //     address: transactionRecord?.address,
  //     tradeType: transactionRecord?.tradeType,
  //   });
  // }, [transactionRecord, transactionForm]);

  const confirmModal = (values) => {
    let amount = 0;
    let transactionItemDetails = [];

    transactionItemsList?.forEach((itemIndex) => {
      // id-0, name-1, price-2, category-3, index-4 ----- order of splitList value

      const itemValuesArray = values?.[`itemValues_${itemIndex}`]?.split("_");
      const itemDetails = {
        categoryName: itemValuesArray?.[3],
        itemId: itemValuesArray?.[0],
        itemName: itemValuesArray?.[1],
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
      name: values?.name?.trim(),
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
        successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
      })
      .catch((error) => {
        errorNotification(error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE);
      });
  };

  const handleCancel = () => {
    setTransactionModal(false);
    // setTransactionRecord?.(null);
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

  const changeItem = (value) => {
    // id-0, name-1, price-2, category-3, index-4 ----- order of splitList value
   
    const itemValuesArray = value?.split("_");
    transactionForm.setFieldValue(`quantity_${itemValuesArray[4]}`, 1);
    if (activeTab === tradeTypes.SELL) {
      transactionForm.setFieldValue(`cost_${itemValuesArray[4]}`, itemValuesArray[2]);
    }
  }

  const getItemsCard = (index) => {
    return (
      <TransactionCardItem 
      itemTotal={itemTotal}
      setItemTotal={setItemTotal}
      index={index}
      itemsList={itemsList}
      changeItem={changeItem}
      removeTransactionItem={removeTransactionItem}
      transactionForm={transactionForm}
      />
    );
  };

  const getSaveText = () => {
    let finalAmount = 0;
    Object.entries(itemTotal)?.forEach(([key, value]) => {
      if (transactionItemsList?.includes(parseInt(key))) {
        finalAmount+= parseInt(value);
      }
    })
    return finalAmount ? ` - Rs.${finalAmount}/-` : "";
  }

  return (
    <Modal
      title={
        <div className="space-between side-margins">
          <span>
            {/* {transactionRecord ? "Edit Transaction" : "Add Transaction"} */}
            Add Transaction
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
      <Form name="transactionForm" form={transactionForm} onFinish={confirmModal}>
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

        <FormButtons
          saveText={`Submit${getSaveText()}`}
          cancelText="Cancel"
          handleCancel={handleCancel}
        />
      </Form>
    </Modal>
  );
};

export default TransactionModal;
