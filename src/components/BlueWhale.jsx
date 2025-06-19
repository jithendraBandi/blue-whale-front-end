import { Radio } from "antd";
import "./components.css";
import { useEffect, useState } from "react";
import { headerTabViews } from "../utils/constants";
import Items from "./HeaderTabViews/Items";
import Categories from "./HeaderTabViews/Categories";
import Transactions from "./HeaderTabViews/Transactions";
import { GET_ALL_CONTACTS, GET_ALL_ITEMS, GET_ALL_MAINTENANCE, GET_ALL_TRANSACTIONS, GET_CATEGORIES } from "../utils/apis";
import axios from "axios";
import Maintencance from "./HeaderTabViews/Maintencance";
import Logo from "../images/logo.png";
import Contacts from "./HeaderTabViews/Contacts";

const BlueWhale = () => {
  const [activeTabView, setActiveTabView] = useState(headerTabViews.ITEMS);

  const [itemsList, setItemsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);  
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getItemsList();
    getCategoriesList();
    getTransactionsList();
    getMaintenanceList();
    getContactList();
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
  const getContactList = () => {
    axios.get(GET_ALL_CONTACTS)
        .then(response => {
            setContactList(response?.data?.data);
        })
        .catch(error => {});
  }


  return (
    <>
      <div className="header">
        <div className="flex-row">
          <img className="logo-image" src={Logo} alt="logo" />
          <h3 className="blue-color">Blue Whale Aqua Solutions</h3>
        </div>
        <Radio.Group
          onChange={(event) => setActiveTabView(event.target.value)}
          value={activeTabView}
        >
          <Radio.Button value={headerTabViews.ITEMS}>
            Items {<span className="total-number-display">{itemsList?.length}</span>}
            </Radio.Button>
          <Radio.Button value={headerTabViews.CATEGORIES}>
            Categories {<span className="total-number-display">{categoriesList?.length}</span>}
          </Radio.Button>
          <Radio.Button value={headerTabViews.TRANSACTIONS}>
            Transactions {<span className="total-number-display">{transactionsList?.length}</span>}
          </Radio.Button>
          <Radio.Button value={headerTabViews.MAINTENANCE}>
            Maintenance {<span className="total-number-display">{maintenanceList?.length}</span>}
          </Radio.Button>
          <Radio.Button value={headerTabViews.CONTACTS}>
            Contacts {<span className="total-number-display">{contactList?.length}</span>}
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
          contactList={contactList}
          getContactList={getContactList}
          categoriesList={categoriesList}
        />
      )}
      
      {activeTabView === headerTabViews.MAINTENANCE && (
        <Maintencance 
          maintenanceList={maintenanceList}
          getMaintenanceList={getMaintenanceList}
          itemsList={itemsList}
        />
      )}

      {activeTabView === headerTabViews.CONTACTS && (
        <Contacts
          contactList={contactList}
          getContactList={getContactList}
        />
      )}
    </>
  );
};

export default BlueWhale;
