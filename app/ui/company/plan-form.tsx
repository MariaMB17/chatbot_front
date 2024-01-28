"use client";
import React from 'react';
import { Badge, Button, Card, Flex, Space } from 'antd';
import { AndroidOutlined, DollarOutlined, FileTextOutlined, SketchOutlined } from '@ant-design/icons';
import { useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const PlanForm: React.FC = () => {
    const { dataUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        console.log(dataUser)
    }, [dataUser]);
    return (
        <>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Badge.Ribbon text={dataUser.plan?.name} color="red">
                    <Card title={dataUser.plan?.name} size="small" style={{ fontWeight: 'bold' }}>
                        <p> {dataUser.plan?.description} </p>
                        <Flex gap="small" align="flex-start" vertical style={{ padding: '10px 0px'}}>
                            <Flex gap="small" wrap="wrap">
                                <Button type="primary" shape="round" icon={<FileTextOutlined />} style={{ background: '#0c1070' }}>
                                    Documentos: {dataUser.plan?.documents}
                                </Button>
                                <Button type="primary" shape="round" icon={<SketchOutlined />} style={{ background: 'rgb(121 119 4)' }}>
                                    Creditos: {dataUser.plan?.credits}
                                </Button>
                                <Button type="primary" shape="round" icon={<AndroidOutlined />} style={{ background: 'violet' }}>
                                    Bots: {dataUser.plan?.bots}
                                </Button>

                                <Button type="primary" shape="round" icon={<DollarOutlined />} style={{ background: '#23834b' }}>
                                    Costo: {dataUser.plan?.cost}
                                </Button>                                
                            </Flex>
                        </Flex>
                    </Card>
                </Badge.Ribbon>
            </Space>
        </>
    )
}

export default PlanForm