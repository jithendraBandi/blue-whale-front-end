import { Table } from "antd"
import { categoriesTableColumns } from "../../utils/TableColumns"

const Categories = ({
    categoriesList,
    categoryEdit,
}) => {
  return (
    <Table
        columns={categoriesTableColumns({categoryEdit})}
        dataSource={categoriesList}
        pagination={false}
    />
  )
}

export default Categories