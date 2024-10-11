import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { quantityFilters } from "./constants";

export const categoriesTableColumns = ({ categoryEdit }) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a?.id - b?.id,
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a?.name?.localeCompare(b?.name),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => categoryEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button>
        {/* <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => deleteProfile(record)}
        /> */}
      </Space>
    ),
  },
];

export const itemsTableColumns = ({ itemEdit, getCategoryFilterList }) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a?.id - b?.id,
  },
  {
    title: "Category",
    key: "categoryId",
    sorter: (a, b) => a?.category?.name?.localeCompare(b?.category?.name),
    render: (_, record) => <p>{record?.category?.name}</p>,
    filters: getCategoryFilterList(),
    onFilter: (value, record) => record?.categoryId === value,
  },
  {
    title: "Item",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a?.name?.localeCompare(b?.name),
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    sorter: (a, b) => a?.company?.localeCompare(b?.company),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a?.quantity - b?.quantity,
    filters: [
      {text: quantityFilters.GREEN, value: quantityFilters.GREEN},
      {text: quantityFilters.YELLOW, value: quantityFilters.YELLOW},
      {text: quantityFilters.RED, value: quantityFilters.RED},
    ],
    onFilter: (value, record) => {
      if (value === quantityFilters.RED) return record?.quantity === 0;
      else if (value === quantityFilters.YELLOW) return record?.quantity <= 9 && record?.quantity > 0;
      else if (value === quantityFilters.GREEN) return record?.quantity >= 10;
      return false;
    }
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
        {/* <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => deleteProfile(record)}
        /> */}
      </Space>
    ),
  },
];

export const transactionTableColumns = ({ transactionEdit }) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a?.id - b?.id,
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
        <Button onClick={() => transactionEdit(record)}>
          <EditOutlined style={{ color: "blue" }} />
        </Button>
      </Space>
    ),
  },
];

export const transactionItemsDetailsTableColumns = () => [
  {
    title: "Item Id",
    dataIndex: "itemId",
    key: "itemId",
  },
  {
    title: "Item Name",
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
];