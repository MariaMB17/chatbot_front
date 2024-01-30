import { ColumnType } from "antd/es/table";

export interface ColumnTable {
    title: string,
    dataIndex: string,
    key: string,
    render?: (data: any) => void;
  }

export interface AppTableProps{
    columns: ColumnType<ColumnTable>[];
    data: any[];
}