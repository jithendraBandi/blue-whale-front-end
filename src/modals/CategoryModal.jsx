import { Col, Form, Modal, Row } from "antd";
import { useEffect } from "react";
import FormButtons from "../utils/FormButtons";
import FloatInput from "../utils/FloatInput";
import axios from "axios";
import { SAVE_CATEGORY } from "../utils/apis";
import { errorNotification, successNotification } from "../utils/constants";
import { ACTION_SUCCESSFULL_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../utils/stringConstants";

const CategoryModal = ({
  categoryModal,
  setCategoryModal,
  categoryRecord,
  setCategoryRecord,
  getCategoriesList,
  getItemsList,
}) => {
  const [categoryForm] = Form.useForm();

  useEffect(() => {
    if (!categoryRecord) return;
    categoryForm.setFieldsValue({
        id: categoryRecord?.id,
        name: categoryRecord?.name,
    })
  }, [categoryRecord, categoryForm]);

  const onFinish = (values) => {
    if (values?.name?.trim() === "") {
        errorNotification("Category name should not be empty");
        return;
    }
    axios.post(SAVE_CATEGORY, {...values, name: values?.name?.trim()})
        .then(response => {
            getCategoriesList();
            categoryRecord && getItemsList();
            handleCancel();
            successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
        })
        .catch(error => {
          errorNotification(error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE);
        });
  };

  const handleCancel = () => {
    setCategoryModal(false);
    setCategoryRecord?.(null);
    categoryForm.resetFields();
  };

  return (
    <Modal
      title={categoryRecord ? "Edit Category" : "Add Category"}
      open={categoryModal}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form name="categoryForm" form={categoryForm} onFinish={onFinish}>
      <Row style={{marginTop:"20px"}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="id">
            <FloatInput disabled type="number" label="Category Id" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={18}>
          <Form.Item 
          name="name"
          rules={[{required: true, message:""}]}
          >
            <FloatInput type="text" label="Category Name" />
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

export default CategoryModal;
