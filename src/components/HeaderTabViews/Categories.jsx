import { Modal, Table } from "antd";
import { categoriesTableColumns } from "../../utils/TableColumns";
import { useState } from "react";
import CategoryModal from "../../modals/CategoryModal";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import { antdTableScrollYaxis } from "../../utils/styles";
import { DELETE_CATEGORY } from "../../utils/apis";
import { ACTION_SUCCESSFULL_MESSAGE, UNDONE_WARNING_MESSAGE, UNEXPECTED_ERROR_MESSAGE } from "../../utils/stringConstants";
import axios from "axios";
import { errorNotification, successNotification } from "../../utils/constants";
import FloatInput from "../../utils/FloatInput";

const Categories = ({ categoriesList, getCategoriesList, getItemsList }) => {
  const [categoryRecord, setCategoryRecord] = useState(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const categoryEdit = (record) => {
    setCategoryModal(true);
    setCategoryRecord(record);
  };

  const filteredCategoryList = () =>
    categoriesList?.filter((category) =>
      category?.name?.toLowerCase()?.includes(categorySearch?.toLowerCase())
    );

  const deleteCategory = (record) => {
    Modal.confirm({
      title: "Delete Category",
      content: UNDONE_WARNING_MESSAGE,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        axios.delete(DELETE_CATEGORY.replace("{categoryId}", record?.id))
          .then(response => {
            getCategoriesList();
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
          onChange={(event) => setCategorySearch(event.target.value)}
          value={categorySearch}
          type="search"
          label="Search Category..."
        />
      <PlusOutlinedButton setModal={setCategoryModal} />
      </div>
      <Table
        columns={categoriesTableColumns({ categoryEdit, deleteCategory })}
        dataSource={filteredCategoryList()}
        rowKey="id"
        scroll={antdTableScrollYaxis}
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
