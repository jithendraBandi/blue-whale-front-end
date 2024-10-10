import { Button, Radio } from "antd";
import "./components.css";
import { useEffect, useState } from "react";
import { headerTabViews } from "../utils/constants";
import Items from "./HeaderTabViews/Items";
import Categories from "./HeaderTabViews/Categories";
import Transactions from "./HeaderTabViews/Transactions";
import { GET_CATEGORIES } from "../utils/apis";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import Maintencance from "./HeaderTabViews/Maintencance";
import CategoryModal from "../modals/CategoryModal";

const BlueWhale = () => {
  const [activeTabView, setActiveTabView] = useState(headerTabViews.ITEMS);

  const [categoriesList, setCategoriesList] = useState([]);

  const [itemModal, setItemModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [maintenanceModal, setMaintenanceModal] = useState(false);

  const [itemRecord, setItemRecord] = useState(null);
  const [categoryRecord, setCategoryRecord] = useState(null);
  const [transactionRecord, setTransactionRecord] = useState(null);
  const [maintenanceRecord, setMaintenanceRecord] = useState(null);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = () => {
    axios.get(GET_CATEGORIES)
        .then(response => {
            setCategoriesList(response?.data?.data);
        })
        .catch(error => {});
  }

  const handleAddButton = () => {
    switch (activeTabView) {
        case headerTabViews.ITEMS:
            setItemModal(true);
            break;
        case headerTabViews.CATEGORIES:
            setCategoryModal(true);
            break;
        case headerTabViews.TRANSACTIONS:
            setTransactionModal(true);
            break;
        case headerTabViews.MAINTENANCE:
            setMaintenanceModal(true);
            break;
        default:
            break;
    }
  };

  const categoryEdit = (categoryRecord) => {
    setCategoryModal(true);
    setCategoryRecord(categoryRecord);
  }

  return (
    <>
      <div className="header">
        <h3 style={{ color: "blue" }}>Blue Whale Aqua Solutions</h3>
        <Radio.Group
          onChange={(event) => setActiveTabView(event.target.value)}
          value={activeTabView}
        >
          <Radio.Button value={headerTabViews.ITEMS}>Items</Radio.Button>
          <Radio.Button value={headerTabViews.CATEGORIES}>
            Categories
          </Radio.Button>
          <Radio.Button value={headerTabViews.TRANSACTIONS}>
            Transactions
          </Radio.Button>
          <Radio.Button value={headerTabViews.MAINTENANCE}>
            Maintenance
          </Radio.Button>
        </Radio.Group>
        <Button type="primary" onClick={handleAddButton}>
          <PlusOutlined />
        </Button>
      </div>

      {activeTabView === headerTabViews.ITEMS && <Items />}
      {activeTabView === headerTabViews.CATEGORIES && (
        <Categories
          categoriesList={categoriesList}
          categoryEdit={categoryEdit}
        />
      )}
      {activeTabView === headerTabViews.TRANSACTIONS && <Transactions />}
      {activeTabView === headerTabViews.MAINTENANCE && <Maintencance />}

      {/* {itemModal && (
        <ItemModal 
            itemModal={itemModal}
            setItemModal={setItemModal}
            itemRecord={itemRecord}
            setItemRecord={setItemRecord}
            // getItemsList={getItemsList}
        />
      )} */}
      {categoryModal && (
        <CategoryModal 
            categoryModal={categoryModal}
            setCategoryModal={setCategoryModal}
            categoryRecord={categoryRecord}
            setCategoryRecord={setCategoryRecord}
            getCategoriesList={getCategoriesList}
        />
      )}
      {/* {transactionModal && (
        <TransactionModal 
            transactionModal={transactionModal}
            setTransactionModal={setTransactionModal}
            transactionRecord={transactionRecord}
            setTransactionRecord={setTransactionRecord}
            // getTransactionsList={getTransactionsList}
        />
      )} */}
      {/* {maintenanceModal && (
        <MaintenanceModal 
            maintenanceModal={maintenanceModal}
            setMaintenanceModal={setMaintenanceModal}
            maintenanceRecord={maintenanceRecord}'
            setMaintenanceRecord={setMaintenanceRecord}
            // getMaintenanceList={getMaintenanceList}
        />
      )} */}
    </>
  );
};

export default BlueWhale;
