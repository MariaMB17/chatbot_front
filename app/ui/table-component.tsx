import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { AppTableProps } from "../lib/model/column-table-model";

const AppTable: React.FC<AppTableProps> = ({ columns, data }) => (
    <Table columns={columns} dataSource={data} />
  );
  

export default AppTable;