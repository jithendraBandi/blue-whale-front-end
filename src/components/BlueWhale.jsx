import { Radio } from "antd";
import "./components.css";
import { useState } from "react";
import { headerTabViews } from "../utils/constants";
import Items from "./HeaderTabViews/Items";
import Categories from "./HeaderTabViews/Categories";
import Transactions from "./HeaderTabViews/Transactions";

const BlueWhale = () => {
  const [activeTabView, setActiveTabView] = useState("itemsView");
  return (
    <>
      <div className="header">
        <h3 style={{ color: "blue" }}>Blue Whale Aqua Solutions</h3>
        <Radio.Group
          onChange={(event) => setActiveTabView(event.target.value)}
          value={activeTabView}
        >
          <Radio.Button value={headerTabViews.ITEMS}>Items</Radio.Button>
          <Radio.Button value={headerTabViews.CATEGORIES}>Categories</Radio.Button>
          <Radio.Button value={headerTabViews.TRANSACTIONS}>Transactions</Radio.Button>
        </Radio.Group>
      </div>
      {activeTabView === headerTabViews.ITEMS && <Items />}
      {activeTabView === headerTabViews.CATEGORIES && <Categories />}
      {activeTabView === headerTabViews.TRANSACTIONS && <Transactions />}
    </>
  );
};

export default BlueWhale;
