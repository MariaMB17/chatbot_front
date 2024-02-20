"use client";
import React, { useState } from 'react';
import { Badge, Button, Card, Flex, Space, Tooltip } from 'antd';
import { AndroidOutlined, DollarOutlined, EditOutlined, FileTextOutlined, SketchOutlined } from '@ant-design/icons';
import { useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import ListComponent from '../components/list-component';
import { ItemList } from '@/app/lib/interface/item-list';
import CustomModal from '../components/modal-component';
import CreateForm from '../plans/create-form';

const PlanForm: React.FC = () => {
    const items: ItemList[] = []

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [showFooterModal] = useState(false);
    const [dataList, setDataList] = useState<ItemList[]>(items);
    const { dataUser } = useAppSelector((state) => state.user);


    useEffect(() => {
        const { plan, ...dataUserProfile } = dataUser
        const data = plan?.member || []
        const d: ItemList[] = data.map((item) => {
            return {
                title: `${item.user?.Profile?.lastname || ''} ${item.user?.Profile?.lastname || ''} { ${item.user?.email || ''} }`,
                description: item.user?.Profile?.address || ''
            }

        })
        setDataList([...d])
    }, [dataUser]);

    const handleOkClick = () => {
        console.log('ok')
        setConfirmLoading(true)
        setTimeout(() =>{
            setConfirmLoading(false)
        }, 6000)
    }

    const handleCancelClick = () => {
        console.log('Cancel')
        setOpen(false);
    }

    const showModal = () => {
        setOpen(true)        
    }
    return (
        <>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {<Badge.Ribbon text={dataUser.plan?.name} color="red">
                    <Card title={dataUser.plan?.name} size="small" style={{ fontWeight: 'bold' }}>
                        <p> {dataUser.plan?.description} </p>
                        <Flex gap="small" align="flex-start" vertical style={{ padding: '10px 0px' }}>
                            <Flex gap="small" wrap="wrap">
                                <Button type="primary" shape="round" icon={<FileTextOutlined />} style={{ background: '#0c1070' }}>
                                    Documents: {dataUser.plan?.documents}
                                </Button>
                                <Button type="primary" shape="round" icon={<SketchOutlined />} style={{ background: 'rgb(121 119 4)' }}>
                                    Credits: {dataUser.plan?.credits}
                                </Button>
                                <Button type="primary" shape="round" icon={<AndroidOutlined />} style={{ background: 'violet' }}>
                                    Bots: {dataUser.plan?.bots}
                                </Button>

                                <Button type="primary" shape="round" icon={<DollarOutlined />} style={{ background: '#23834b' }}>
                                    Cost: {dataUser.plan?.cost}
                                </Button>
                            </Flex>
                        </Flex>
                        <Flex wrap="wrap" gap="small" align="flex-end" style={{ float: 'inline-end' }}>
                            <Tooltip title="UPDATE PLAN">
                                <Button shape="circle" icon={<EditOutlined />} onClick={showModal}/>
                            </Tooltip>

                            <CustomModal 
                                title='Modify Plan'
                                open={open}
                                onOk={() => handleOkClick()}
                                onCancel={() => handleCancelClick()}
                                confirmLoading={confirmLoading}
                                children={<CreateForm/>}
                                showFooter={showFooterModal} 
                            ></CustomModal>

                        </Flex>
                    </Card>
                    <Card title="MEMBERS" size="small" style={{ fontWeight: 'bold', padding: '10px 0px' }}>

                        {<ListComponent dataItems={dataList} />}

                    </Card>
                </Badge.Ribbon>}
            </Space>
        </>
    )
}

export default PlanForm