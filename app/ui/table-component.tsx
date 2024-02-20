import { Table } from "antd";

const AppTable: React.FC<any> = ({ columns, data, title }) => (
  <Table
    bordered={true}
    virtual
    scroll={{ x: 'auto', y: 400 }}
    columns={columns}
    dataSource={data}
    title={() => title}/>
);


export default AppTable;