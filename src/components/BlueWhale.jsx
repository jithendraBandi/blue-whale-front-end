import { Radio } from "antd";
import "./components.css";
import { useEffect, useState } from "react";
import { headerTabViews } from "../utils/constants";
import Items from "./HeaderTabViews/Items";
import Categories from "./HeaderTabViews/Categories";
import Transactions from "./HeaderTabViews/Transactions";
import { GET_ALL_ITEMS, GET_ALL_MAINTENANCE, GET_ALL_TRANSACTIONS, GET_CATEGORIES } from "../utils/apis";
import axios from "axios";
import Maintencance from "./HeaderTabViews/Maintencance";

const BlueWhale = () => {
  const [activeTabView, setActiveTabView] = useState(headerTabViews.ITEMS);

  const [itemsList, setItemsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);  
  const [maintenanceList, setMaintenanceList] = useState([]);

  useEffect(() => {
    getItemsList();
    getCategoriesList();
    getTransactionsList();
    getMaintenanceList();
  }, []);

  const getItemsList = () => {
    axios.get(GET_ALL_ITEMS)
        .then(response => {
            setItemsList(response?.data?.data);
        })
        .catch(error => {});
  }

  const getCategoriesList = () => {
    axios.get(GET_CATEGORIES)
        .then(response => {
            setCategoriesList(response?.data?.data);
        })
        .catch(error => {});
  }

  const getTransactionsList = () => {
    axios.get(GET_ALL_TRANSACTIONS)
        .then(response => {
            setTransactionsList(response?.data?.data);
        })
        .catch(error => {});
  }

  const getMaintenanceList = () => {
    axios.get(GET_ALL_MAINTENANCE)
        .then(response => {
            setMaintenanceList(response?.data?.data);
        })
        .catch(error => {});
  }


  return (
    <>
      <div className="header">
        <h3 className="blue-color">Blue Whale Aqua Solutions</h3>
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
      </div>

      {activeTabView === headerTabViews.ITEMS && (
        <Items 
            itemsList={itemsList}
            getItemsList={getItemsList}
            categoriesList={categoriesList}
        />
      )}

      {activeTabView === headerTabViews.CATEGORIES && (
        <Categories
          categoriesList={categoriesList}
          getCategoriesList={getCategoriesList}
          getItemsList={getItemsList}
        />
      )}

      {activeTabView === headerTabViews.TRANSACTIONS && (
        <Transactions 
          transactionsList={transactionsList}
          getTransactionsList={getTransactionsList}
          getItemsList={getItemsList}
          itemsList={itemsList}
        />
      )}
      
      {activeTabView === headerTabViews.MAINTENANCE && (
        <Maintencance 
          maintenanceList={maintenanceList}
          getMaintenanceList={getMaintenanceList}
          itemsList={itemsList}
        />
      )}
    </>
  );
};

export default BlueWhale;
