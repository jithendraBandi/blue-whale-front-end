import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export const categoriesTableColumns = ({categoryEdit}) => [
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
          <EditOutlined
            style={{ color: "blue" }}
          />
        </Button>
        {/* <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => deleteProfile(record)}
        /> */}
      </Space>
    ),
  },
];
