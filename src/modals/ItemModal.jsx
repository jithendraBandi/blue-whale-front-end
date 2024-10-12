import { Col, Form, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import FormButtons from "../utils/FormButtons";
import FloatInput from "../utils/FloatInput";
import FloatSelect from "../utils/FloatSelect"
import axios from "axios";
import { SAVE_ITEM } from "../utils/apis";
import { errorNotification, successNotification } from "../utils/constants";
import { ACTION_SUCCESSFULL_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../utils/stringConstants";

const ItemModal = ({
  itemModal,
  setItemModal,
  itemRecord,
  setItemRecord,
  getItemsList,
  categoriesList,
}) => {
  const [itemForm] = Form.useForm();

    useEffect(() => {
      if (!itemRecord) return;
      itemForm.setFieldsValue({
          id: itemRecord?.id,
          name: itemRecord?.name,
          price: itemRecord?.price,
          quantity: itemRecord?.quantity,
          company: itemRecord?.company,
          categoryId: itemRecord?.category?.name,
      })
    }, [itemRecord, itemForm]);

  const onFinish = (values) => {
    if (values?.name?.trim() === "") {
        errorNotification("Item name should not be empty");
        return;
    }
    const categoryId = categoriesList?.find(category => category?.name === values?.categoryId)?.id;
    axios.post(SAVE_ITEM, {...values, name: values?.name?.trim(), categoryId})
        .then(response => {
            getItemsList();
            handleCancel();
            successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
        })
        .catch(error => {
          errorNotification(error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE);
        });
  };

  const handleCancel = () => {
    setItemModal(false);
    setItemRecord?.(null);
    itemForm.resetFields();
  };

  return (
    <Modal
      title={itemRecord ? "Edit Item" : "Add Item"}
      open={itemModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form name="itemForm" form={itemForm} onFinish={onFinish}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{marginTop:"20px"}}
        >
          <Col className="gutter-row" span={6}>
            <Form.Item name="id">
              <FloatInput disabled type="number" label="Item Id" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={18}>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <FloatInput type="text" label="Item Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="company" rules={[{ required: true, message: "" }]}>
              <FloatInput type="text" label="Company" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="categoryId" rules={[{ required: true, message: "" }]}>
            <FloatSelect label="Category" showSearch>
                {categoriesList?.sort()?.map(category => (
                    <Select.Option key={category?.id} value={category?.name}>
                    {category?.name}
                    </Select.Option>
                ))}
              </FloatSelect>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="price" rules={[{ required: true, message: "" }]}>
              <FloatInput type="number" label="Price (in Rs/-)" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="quantity">
              <FloatInput type="number" disabled label="Quantity" />
            </Form.Item>
          </Col>
        </Row>

        <FormButtons
          saveText="Submit"
          cancelText="Cancel"
          handleCancel={handleCancel}
        />
      </Form>
    </Modal>
  );
};

export default ItemModal;
