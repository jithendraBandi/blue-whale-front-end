import { Modal, Radio, Table } from "antd";
import {
  transactionItemsDetailsTableColumns,
  transactionTableColumns,
} from "../../utils/TableColumns";
import { useState } from "react";
import PlusOutlinedButton from "../../utils/PlusOutlinedButton";
import TransactionModal from "../../modals/TransactionModal";
import {
  errorNotification,
  successNotification,
  tradeTypes,
} from "../../utils/constants";
import axios from "axios";
import { DELETE_TRANSACTION } from "../../utils/apis";
import {
  ACTION_SUCCESSFULL_MESSAGE,
  UNDONE_WARNING_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
} from "../../utils/stringConstants";
import FloatInput from "../../utils/FloatInput";
import InvoiceViewModal from "../../modals/InvoiceViewModal";

const Transactions = ({
  getTransactionsList,
  getItemsList,
  transactionsList,
  itemsList,
}) => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionRecord, setTransactionRecord] = useState(null);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [tradeType, setTradeType] = useState(tradeTypes.SELL);
  const [transactionDateSearch, setTransactionDateSearch] = useState("");

  const filteredTransactionList = (tradeType) =>
    transactionsList?.filter(
      (transaction) =>
        transaction?.tradeType === tradeType &&
        transaction?.date
          .toLowerCase()
          ?.includes(transactionDateSearch?.toLowerCase())
    );

  // const transactionEdit = (record) => {
  //   setTransactionModal(true);
  //   // setTransactionRecord(record);
  // };

  const viewInvoice = (record) => {
    setInvoiceModal(true);
    setTransactionRecord(record);
  }

  const deleteTransaction = (record) => {
    Modal.confirm({
      title: "Delete Transaction",
      content: UNDONE_WARNING_MESSAGE,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        axios
          .delete(DELETE_TRANSACTION.replace("{transactionId}", record?.id))
          .then((response) => {
            getItemsList();
            getTransactionsList();
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

  return (
    <>
      <div className="space-between side-margins">
        <FloatInput
          onChange={(event) => setTransactionDateSearch(event.target.value)}
          value={transactionDateSearch}
          type="search"
          label="Search Date..."
        />
        <Radio.Group
          onChange={(event) => setTradeType(event.target.value)}
          value={tradeType}
        >
          <Radio.Button value={tradeTypes.SELL}>{tradeTypes.SELL} {<span className="total-number-display">{filteredTransactionList(tradeTypes.SELL).length}</span>}</Radio.Button>
          <Radio.Button value={tradeTypes.BUY}>{tradeTypes.BUY} {<span className="total-number-display">{filteredTransactionList(tradeTypes.BUY).length}</span>}</Radio.Button>
          <Radio.Button value={tradeTypes.USAGE}>{tradeTypes.USAGE} {<span className="total-number-display">{filteredTransactionList(tradeTypes.USAGE).length}</span>}</Radio.Button>
        </Radio.Group>
        <PlusOutlinedButton setModal={setTransactionModal} />
      </div>
      <Table
        columns={transactionTableColumns({
          // transactionEdit,
          viewInvoice,
          deleteTransaction,
        })}
        dataSource={filteredTransactionList(tradeType)}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={transactionItemsDetailsTableColumns(tradeType)}
              dataSource={record?.transactionItemDetails}
              rowKey="itemId"
              pagination={false}
            />
          ),
          rowExpandable: (record) => record?.transactionItemDetails?.length > 0,
        }}
      />
      {transactionModal && (
        <TransactionModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          // transactionRecord={transactionRecord}
          // setTransactionRecord={setTransactionRecord}
          itemsList={itemsList}
          getTransactionsList={getTransactionsList}
          getItemsList={getItemsList}
          activeTab={tradeType}
          setActiveTab={setTradeType}
        />
      )}
      {invoiceModal && (
        <InvoiceViewModal
          invoiceModal={invoiceModal}
          setInvoiceModal={setInvoiceModal}
          record={transactionRecord}
          setRecord={setTransactionRecord}
        />
      )}
    </>
  );
};

export default Transactions;
