import { Col, Form, Modal, Row } from "antd";
import { useEffect } from "react";
import FormButtons from "../utils/FormButtons";
import FloatInput from "../utils/FloatInput";
import axios from "axios";
import { SAVE_CONTACT } from "../utils/apis";
import { errorNotification, successNotification } from "../utils/constants";
import { ACTION_SUCCESSFULL_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../utils/stringConstants";
import TextArea from "antd/es/input/TextArea";

const ContactModal = ({
  contactModal,
  setContactModal,
  contactRecord,
  setContactRecord,
  getContactList,
}) => {
  const [contactForm] = Form.useForm();

  useEffect(() => {
    if (!contactRecord) return;
    contactForm.setFieldsValue({
        id: contactRecord?.id,
        name: contactRecord?.name,
        address: contactRecord?.address,
        mobileNumber: contactRecord?.mobileNumber,
        notes: contactRecord?.notes,
    })
  }, [contactRecord, contactForm]);

  const onFinish = (values) => {
    if (values?.name?.trim() === "") {
        errorNotification("Name should not be empty");
        return;
    }
    axios.post(SAVE_CONTACT, {...values, name: values?.name?.trim()})
        .then(response => {
            getContactList();
            handleCancel();
            successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
        })
        .catch(error => {
          errorNotification(error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE);
        });
  };

  const handleCancel = () => {
    setContactModal(false);
    setContactRecord?.(null);
    contactForm.resetFields();
  };

  return (
    <Modal
      title={contactRecord ? "Edit Contact" : "Add Contact"}
      open={contactModal}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form name="contactForm" form={contactForm} onFinish={onFinish}>
      <Row style={{marginTop:"20px"}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="id">
            <FloatInput disabled type="number" label="Contact Id" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={18}>
          <Form.Item 
          name="name"
          rules={[{required: true, message:""}]}
          >
            <FloatInput type="text" label="Name" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
            <Form.Item
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: "",
                },
                {
                  len: 10,
                  message: "",
                },
              ]}
            >
              <FloatInput type="number" label="Mobile Number" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "" }]}
            >
              <FloatInput type="text" label="Address" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              name="notes"
              label="Notes"
            >
              <TextArea placeholder="Notes goes here..."/>
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

export default ContactModal;
