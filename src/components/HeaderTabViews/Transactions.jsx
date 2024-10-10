import { Table } from "antd"
import { transactionTableColumns } from "../../utils/TableColumns"

const Transactions = () => {
  return (
    <Table columns={transactionTableColumns} />
  )
}

export default Transactions