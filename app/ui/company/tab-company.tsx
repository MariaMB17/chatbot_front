import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Space, Tabs } from 'antd';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const AppTabCompany: React.FC<TabsProps> = ({ items }) => {
  const [tabPosition, setTabPosition] = useState<TabPosition>('top');

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 24 }}>
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs defaultActiveKey="1" tabPosition={tabPosition} items={items} />
    </>
  );
};

export default AppTabCompany;