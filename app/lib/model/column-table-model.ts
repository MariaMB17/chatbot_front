import { GetProp, TableColumnsType } from "antd";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/es/table";
type ColumnsType<T extends object> = TableProps<T>['columns']

type TextAlign = 'left' | 'right' | 'center';
export interface ColumnTable {
    title: string,
    dataIndex: string,
    key: string,
    align?: TextAlign,
    render?: (data: any) => void;
  }

export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  }

export interface AppTableProps<T>{
    columns:  TableColumnsType<T>,
    data: T[],
    onChange: TableProps<T>['onChange'];
}