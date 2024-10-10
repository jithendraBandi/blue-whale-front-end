import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

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

export const itemsTableColumns = ({itemEdit}) => [
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
    render: (_, record) => <p>{record?.category?.name}</p>
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

export const transactionTableColumns = [
    // {
    //     title: "Id",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    // {
    //     title: "Name",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    // {
    //     title: "Phone Number",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "Date",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "Address",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "Sell/Buy",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "Total Price",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "List Of each Item (itemName,qunaity,price)",
    //     dataIndex: "id",
    //     key: "id",
    //     sorter: (a, b) => a?.id - b?.id,
    //   },
    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (_, record) => (
    //       <Space size="middle">
    //         <Button 
    //         // onClick={() => itemEdit(record)}
    //         >
    //           <EditOutlined style={{ color: "blue" }} />
    //         </Button>
    //         {/* <DeleteOutlined
    //           style={{ color: "red" }}
    //           onClick={() => deleteProfile(record)}
    //         /> */}
    //       </Space>
    //     ),
    //   },
];