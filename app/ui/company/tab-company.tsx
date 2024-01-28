import React, { useState } from 'react';
import type {  TabsProps } from 'antd';
import { Tabs } from 'antd';

type TabPosition = 'top';

const AppTabCompany: React.FC<TabsProps> = ({ items }) => {
  const [tabPosition] = useState<TabPosition>('top');

  return (
    <>     
      <Tabs defaultActiveKey="1" tabPosition={tabPosition} items={items} />
    </>
  );
};

export default AppTabCompany;