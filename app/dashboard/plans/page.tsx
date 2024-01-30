"use client";
import { useEffect, useState } from 'react';
import { Button, Popconfirm, Skeleton, Space } from 'antd';
import { ColumnTable } from '@/app/lib/model/column-table-model';
import AppTable from '@/app/ui/table-component';
import { Plan } from '@/app/lib/model/plan-model';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const showSkeleton = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    const data: Plan[] = [
        {
            id: 1,
            name: 'FREE',
            description: 'PLAN FREE',
            cost: 0,
            credits: 250,
            bots: 3,
            documents: 1000,
            members: 3,
            member:[]
        }
    ]

    const column = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripcion',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record: { key: React.Key }) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ]

    const handleDelete = (key: any) => {
        console.log('pasooooooo', key)

    }


    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <p>Planes</p>
                <div className="relative mx-auto flex w-full max-w-[900px] flex-col space-y-1.5 p-2">
                    <AppTable columns={column} data={data} />

                </div>
                {/* <h4 style={{ marginBottom: 16 }}>Ant Design, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p> */}
            </Skeleton>
            <Button onClick={showSkeleton} disabled={loading}>
                Show Skeleton
            </Button>
        </Space>
    );
};

export default App;