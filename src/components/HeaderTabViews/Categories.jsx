import { Table } from "antd";
import { categoriesTableColumns } from "../../utils/TableColumns";
import { useState } from "react";
import CategoryModal from "../../modals/CategoryModal";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";

const Categories = ({ categoriesList, getCategoriesList, getItemsList }) => {
  const [categoryRecord, setCategoryRecord] = useState(null);
  const [categoryModal, setCategoryModal] = useState(false);

  const categoryEdit = (record) => {
    setCategoryModal(true);
    setCategoryRecord(record);
  };

  return (
    <>
      <PlusOutlinedButton setModal={setCategoryModal} />
      <Table
        columns={categoriesTableColumns({ categoryEdit })}
        dataSource={categoriesList}
        rowKey="id"
        pagination={false}
      />
      {categoryModal && (
        <CategoryModal
          categoryModal={categoryModal}
          setCategoryModal={setCategoryModal}
          categoryRecord={categoryRecord}
          setCategoryRecord={setCategoryRecord}
          getCategoriesList={getCategoriesList}
          getItemsList={getItemsList}
        />
      )}
    </>
  );
};

export default Categories;
