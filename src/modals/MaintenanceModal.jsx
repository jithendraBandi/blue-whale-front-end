import { Col, DatePicker, Form, Modal, Row } from "antd";
import { useEffect } from "react";
import { errorNotification, successNotification } from "../utils/constants";
import axios from "axios";
import { SAVE_MAINTENANCE } from "../utils/apis";
import dayjs from "dayjs";
import {
  ACTION_SUCCESSFULL_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
} from "../utils/stringConstants";
import FormButtons from "../utils/FormButtons";
import FloatInput from "../utils/FloatInput";

const MaintenanceModal = ({
  maintenanceModal,
  setMaintenanceModal,
  maintenanceRecord,
  setMaintenanceRecord,
  getMaintenanceList,
  itemsList,
}) => {
  const [maintenanceForm] = Form.useForm();

  useEffect(() => {
    if (!maintenanceRecord) return;

    if (maintenanceRecord?.date && maintenanceRecord?.date !== "") {
      const maintenanceDate = dayjs(maintenanceRecord?.date, "DD-MM-YYYY");
      maintenanceForm.setFieldValue("date", maintenanceDate);
    }

    maintenanceForm.setFieldsValue({
      id: maintenanceRecord?.id,
      name: maintenanceRecord?.name,
      mobileNumber: maintenanceRecord?.mobileNumber,
      address: maintenanceRecord?.address,
      comment: maintenanceRecord?.comment,
    });
  }, [maintenanceForm, maintenanceRecord]);

  const onFinish = (values) => {
    if (values?.name?.trim() === "") {
      errorNotification("Name should not be empty");
      return;
    }
    const maintenanceDate = dayjs(values?.date).format("DD-MM-YYYY");
    let payload = {
      ...values,
      date: maintenanceDate,
      name: values?.name?.trim(),
    };

    axios
      .post(SAVE_MAINTENANCE, payload)
      .then((response) => {
        getMaintenanceList();
        handleCancel();
        successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
      })
      .catch((error) => {
        errorNotification(
          error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE
        );
      });
  };

  const handleCancel = () => {
    setMaintenanceModal(false);
    setMaintenanceRecord?.(null);
    maintenanceForm.resetFields();
  };

  return (
    <Modal
      title={maintenanceRecord ? "Edit Maintenance" : "Add Maintenance"}
      open={maintenanceModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form name="maintenanceForm" form={maintenanceForm} onFinish={onFinish}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="first-row-margin-top"
        >
          <Col className="gutter-row" span={8}>
            <Form.Item name="id">
              <FloatInput disabled type="number" label="Maintenance Id" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={16}>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <FloatInput type="text" label="Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "" }]}
            >
              <DatePicker className="full-width" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="mobileNumber"
              rules={[
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
            >
              <FloatInput type="text" label="Address" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="comment"
            >
              <FloatInput type="text" label="Comment" />
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

export default MaintenanceModal;
