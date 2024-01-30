import { Table } from "antd";
import { ColumnType } from "antd/es/table";

interface AppTableProps{
    columns: ColumnType<any>[];
    data: any[];
}

const AppTable: React.FC<AppTableProps> = ({ columns, data }) => (
    <Table columns={columns} dataSource={data} />
  );
  

export default AppTable;