import React  from 'react';
import {  Modal } from 'antd';
interface CustomModalProps {
    title: string;
    open: boolean;
    confirmLoading: boolean;
    onOk: () => void;
    onCancel: () => void;    
    children: React.ReactNode;
    showFooter: boolean
}



const CustomModal: React.FC<CustomModalProps> = ({ 
    title, 
    open, 
    onOk, 
    confirmLoading, 
    onCancel, 
    children,
    showFooter }) => {
  return (
    <Modal
      title={title}
      visible={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      footer={showFooter ? undefined : null}
    >
      {children}
    </Modal>
  );
};

export default CustomModal