import { Table } from "antd";
import { itemsTableColumns } from "../../utils/TableColumns";
import ItemModal from "../../modals/ItemModal";
import { useState } from "react";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import { antdTableScrollYaxis } from "../../utils/styles";
import FloatInput from "../../utils/FloatInput";

const Items = ({ itemsList, getItemsList, categoriesList }) => {
  const [itemModal, setItemModal] = useState(false);
  const [itemRecord, setItemRecord] = useState(null);
  const [itemSearch, setItemSearch] = useState("");

  const filteredItemsList = () =>
    itemsList?.filter((item) =>
      item?.name?.toLowerCase()?.includes(itemSearch?.toLowerCase())
    );

  const itemEdit = (record) => {
    setItemModal(true);
    setItemRecord(record);
  };

  const getCategoryFilterList = () => {
    return categoriesList?.map((category) => ({
      text: category?.name,
      value: category?.id,
    }));
  };
  const rowClassName = (record) => {
    if (record?.quantity === 0) return "item-quantity-zero";
    else if (record?.quantity < 10) return "item-quantity-warning";
    else return "item-quantity-ok";
  };

  return (
    <>
      <div className="space-between side-margins">
        <FloatInput
          // allowClear
          onChange={(event) => setItemSearch(event.target.value)}
          value={itemSearch}
          type="search"
          label="Search Item..."
        />
        <PlusOutlinedButton setModal={setItemModal} />
      </div>
      <Table
        columns={itemsTableColumns({ itemEdit, getCategoryFilterList })}
        dataSource={filteredItemsList()}
        rowClassName={rowClassName}
        rowKey="id"
        pagination={false}
        scroll={antdTableScrollYaxis}
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
