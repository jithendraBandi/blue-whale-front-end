import { Button, Table } from "antd";
import { itemsTableColumns } from "../../utils/TableColumns";
import ItemModal from "../../modals/ItemModal";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";

const Items = ({ itemsList, getItemsList, categoriesList }) => {
  const [itemModal, setItemModal] = useState(false);
  const [itemRecord, setItemRecord] = useState(null);

  const itemEdit = (record) => {
    setItemModal(true);
    setItemRecord(record);
  };
  return (
    <>
      <PlusOutlinedButton setModal={setItemModal} />
      <Table
        columns={itemsTableColumns({ itemEdit })}
        dataSource={itemsList}
        rowKey="id"
        pagination={false}
      />
      {itemModal && (
        <ItemModal
          itemModal={itemModal}
          setItemModal={setItemModal}
          itemRecord={itemRecord}
          setItemRecord={setItemRecord}
          getItemsList={getItemsList}
          categoriesList={categoriesList}
        />
      )}
    </>
  );
};

export default Items;
