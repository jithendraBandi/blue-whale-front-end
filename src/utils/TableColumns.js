import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { quantityFilters } from "./constants";

export const categoriesTableColumns = ({ categoryEdit, deleteCategory }) => [
  {
    title: "S.No",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => categoryEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button>
        <Button onClick={() => deleteCategory(record)}>
          <DeleteOutlined className="red-color" />
        </Button>
      </Space>
    ),
  },
];

export const itemsTableColumns = ({ itemEdit, getCategoryFilterList, deleteItem }) => [
  {
    title: "S.No",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Category",
    key: "categoryId",
    render: (_, record) => <p>{record?.category?.name}</p>,
    filters: getCategoryFilterList(),
    onFilter: (value, record) => record?.categoryId === value,
  },
  {
    title: "Item",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a?.quantity - b?.quantity,
    filters: [
      { text: quantityFilters.GREEN, value: quantityFilters.GREEN },
      { text: quantityFilters.YELLOW, value: quantityFilters.YELLOW },
      { text: quantityFilters.RED, value: quantityFilters.RED },
    ],
    onFilter: (value, record) => {
      if (value === quantityFilters.RED) return record?.quantity === 0;
      else if (value === quantityFilters.YELLOW)
        return record?.quantity <= 9 && record?.quantity > 0;
      else if (value === quantityFilters.GREEN) return record?.quantity >= 10;
      return false;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a?.price - b?.price,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => itemEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button>
        <Button onClick={() => deleteItem(record)}>
          <DeleteOutlined className="red-color" />
        </Button>
      </Space>
    ),
  },
];

export const transactionTableColumns = ({
  // transactionEdit,
  deleteTransaction,
}) => [
  {
    title: "S.No",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a?.name?.localeCompare(b?.name),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a?.amount - b?.amount,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <Button onClick={() => transactionEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button> */}
        <Button onClick={() => deleteTransaction(record)}>
          <DeleteOutlined className="red-color" />
        </Button>
      </Space>
    ),
  },
];

export const transactionItemsDetailsTableColumns = () => [
  {
    title: "S.No",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Item",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    sorter: (a, b) => a?.cost - b?.cost,
  },
  {
    title: "Price",
    render: (_, record) => record?.quantity * record?.cost,
  },
];

export const maintenanceTableColumns = ({maintenanceEdit, deleteMaintenance}) => [
  {
    title: "S.No",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a?.name?.localeCompare(b?.name),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => maintenanceEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button>
        <Button onClick={() => deleteMaintenance(record)}>
          <DeleteOutlined className="red-color" />
        </Button>
      </Space>
    ),
  },
];