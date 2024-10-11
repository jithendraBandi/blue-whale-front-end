import { Radio, Table } from "antd";
import {
  transactionItemsDetailsTableColumns,
  transactionTableColumns,
} from "../../utils/TableColumns";
import { useState } from "react";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import TransactionModal from "../../modals/TransactionModal";
import { tradeTypes } from "../../utils/constants";
import { antdTableScrollYaxis } from "../../utils/styles";

const Transactions = ({
  getTransactionsList,
  getItemsList,
  transactionsList,
  itemsList,
}) => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionRecord, setTransactionRecord] = useState(null);
  const [tradeType, setTradeType] = useState(tradeTypes.SELL);

  const filteredTransactionList = () => transactionsList?.filter(transaction => transaction?.tradeType === tradeType);

  const transactionEdit = (record) => {
    setTransactionModal(true);
    setTransactionRecord(record);
  };
  return (
    <>
      <div className="space-between side-margins">
        <Radio.Group
          onChange={(event) => setTradeType(event.target.value)}
          value={tradeType}
        >
          <Radio.Button value={tradeTypes.SELL}>{tradeTypes.SELL}</Radio.Button>
          <Radio.Button value={tradeTypes.BUY}>{tradeTypes.BUY}</Radio.Button>
        </Radio.Group>
        <PlusOutlinedButton setModal={setTransactionModal} />
      </div>
      <Table
        columns={transactionTableColumns({ transactionEdit })}
        dataSource={filteredTransactionList()}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={transactionItemsDetailsTableColumns()}
              dataSource={record?.transactionItemDetails}
              rowKey="itemId"
              pagination={false}
              scroll={antdTableScrollYaxis}
            />
          ),
          rowExpandable: (record) => record?.transactionItemDetails?.length > 0,
        }}
      />
      {transactionModal && (
        <TransactionModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          transactionRecord={transactionRecord}
          setTransactionRecord={setTransactionRecord}
          itemsList={itemsList}
          getTransactionsList={getTransactionsList}
          getItemsList={getItemsList}
          activeTab={tradeType}
          setActiveTab={setTradeType}
        />
      )}
    </>
  );
};

export default Transactions;
