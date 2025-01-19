import { Modal, Table } from "antd";
import { contactTableColumns } from "../../utils/TableColumns";
import { useState } from "react";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import { antdTableScrollYaxis } from "../../utils/styles";
import { DELETE_CONTACT } from "../../utils/apis";
import { ACTION_SUCCESSFULL_MESSAGE, UNDONE_WARNING_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../../utils/stringConstants";
import axios from "axios";
import { errorNotification, successNotification } from "../../utils/constants";
import FloatInput from "../../utils/FloatInput";
import ContactModal from "../../modals/ContactModal";

const Contacts = ({ contactList, getContactList }) => {
  const [contactRecord, setContactRecord] = useState(null);
  const [contactModal, setContactModal] = useState(false);
  const [contactSearch, setContactSearch] = useState("");

  const contactEdit = (record) => {
    setContactModal(true);
    setContactRecord(record);
  };

  const filteredContactList = () =>
    contactList?.filter((contact) =>
      contact?.name?.toLowerCase()?.includes(contactSearch?.toLowerCase())
    );

  const deleteContact = (record) => {
    Modal.confirm({
      title: "Delete Contact",
      content: UNDONE_WARNING_MESSAGE,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        axios.delete(DELETE_CONTACT.replace("{contactId}", record?.id))
          .then(response => {
            getContactList();
            successNotification(response?.data?.data || ACTION_SUCCESSFULL_MESSAGE);
          })
          .catch(error => {
            errorNotification(error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE);
          });
      },
    });
  };

  return (
    <>
    <div className="space-between side-margins">
        <FloatInput
          onChange={(event) => setContactSearch(event.target.value)}
          value={contactSearch}
          type="search"
          label="Search Contact..."
        />
      <PlusOutlinedButton setModal={setContactModal} />
      </div>
      <Table
        columns={contactTableColumns({ contactEdit, deleteContact })}
        dataSource={filteredContactList()}
        rowKey="id"
        scroll={antdTableScrollYaxis}
        pagination={false}
      />
      {contactModal && (
        <ContactModal
          contactModal={contactModal}
          setContactModal={setContactModal}
          contactRecord={contactRecord}
          setContactRecord={setContactRecord}
          getContactList={getContactList}
        />
      )}
    </>
  );
};

export default Contacts;
