import React, { useState } from 'react';
import { Avatar, List } from 'antd';
import { ItemList, ListProps } from '@/app/lib/interface/item-list';

type PaginationPosition = 'bottom';
type PaginationAlign = 'end';

const ListComponent: React.FC<ListProps<ItemList>> = ({ dataItems }) => {
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('end');

  return (
    <>
      <List
        pagination={{ position, align }}
        dataSource={dataItems}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={`${item.title}`}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListComponent;