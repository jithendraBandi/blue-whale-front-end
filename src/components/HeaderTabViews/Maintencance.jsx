import { useState } from "react";
import FloatInput from "../../utils/FloatInput";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import { Modal, Table } from "antd";
import MaintenanceModal from "../../modals/MaintenanceModal";
import {
  ACTION_SUCCESSFULL_MESSAGE,
  UNDONE_WARNING_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
} from "../../utils/stringConstants";
import axios from "axios";
import { DELETE_MAINTENANCE } from "../../utils/apis";
import {
  errorNotification,
  maintenanceTypes,
  successNotification,
} from "../../utils/constants";
import { maintenanceTableColumns } from "../../utils/TableColumns";
import { antdTableScrollYaxis } from "../../utils/styles";

const Maintencance = ({ maintenanceList, getMaintenanceList, itemsList }) => {
  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const [maintenanceDateSearch, setMaintenanceDateSearch] = useState("");
  const [maintenanceNameSearch, setMaintenanceNameSearch] = useState("");
  const [maintenanceRecord, setMaintenanceRecord] = useState(null);

  const maintenanceEdit = (record) => {
    setMaintenanceModal(true);
    setMaintenanceRecord(record);
  };

  const deleteMaintenance = (record) => {
    Modal.confirm({
      title: "Delete Maintenance",
      content: UNDONE_WARNING_MESSAGE,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        axios
          .delete(DELETE_MAINTENANCE.replace("{maintenanceId}", record?.id))
          .then((response) => {
            getMaintenanceList();
            successNotification(
              response?.data?.data || ACTION_SUCCESSFULL_MESSAGE
            );
          })
          .catch((error) => {
            errorNotification(
              error?.response?.data?.message || UNEXPECTED_ERROR_MESSAGE
            );
          });
      },
    });
  };

  const getMaintenanceFilterList = () => {
    return maintenanceTypes?.map((type) => ({
      text: type,
      value: type,
    }));
  };

  const filteredMaintenanceList = () =>
    maintenanceList?.filter(
      (maintenance) =>
        maintenance?.maintenanceDate
          ?.toLowerCase()
          ?.includes(maintenanceDateSearch?.toLowerCase()) &&
        maintenance?.name
          ?.toLowerCase()
          ?.includes(maintenanceNameSearch?.toLowerCase())
    );

  return (
    <>
      <div className="space-between side-margins">
        <div className="space-between">
          <FloatInput
            onChange={(event) => setMaintenanceNameSearch(event.target.value)}
            value={maintenanceNameSearch}
            type="search"
            label="Search Name..."
          />
          <FloatInput
            onChange={(event) => setMaintenanceDateSearch(event.target.value)}
            value={maintenanceDateSearch}
            type="search"
            label="Search Date..."
            className="side-margins"
          />
        </div>
        <PlusOutlinedButton setModal={setMaintenanceModal} />
      </div>
      <Table
        columns={maintenanceTableColumns({
          maintenanceEdit,
          deleteMaintenance,
          getMaintenanceFilterList,
        })}
        dataSource={filteredMaintenanceList()}
        scroll={antdTableScrollYaxis}
        rowKey="id"
        pagination={false}
      />
      {maintenanceModal && (
        <MaintenanceModal
          maintenanceModal={maintenanceModal}
          setMaintenanceModal={setMaintenanceModal}
          maintenanceRecord={maintenanceRecord}
          setMaintenanceRecord={setMaintenanceRecord}
          getMaintenanceList={getMaintenanceList}
          itemsList={itemsList}
        />
      )}
    </>
  );
};

export default Maintencance;
