"use client";
import { useEffect, useState } from 'react';
import { Button, Flex, Skeleton, Space, TableColumnsType, Tooltip } from 'antd';
import AppTable from '@/app/ui/table-component';
import { Plan } from '@/app/lib/model/plan-model';
import { DeleteOutlined } from '@ant-design/icons';
import NumberFormat from '@/app/ui/components/number-format';
import { deletePlan, getAllPlan } from '@/app/lib/services/plan.service';
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import BtnLinkComponent from '@/app/ui/components/btn-link-component';
import InputSearchComponent from '@/app/ui/components/input-search-componet';
import { ResponseModel } from '@/app/lib/model/reponse-model';

const App: React.FC = ({
    searchParams
}: {
    searchParams?: {
        query?: string
    }
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [plan, setPlan] = useState<Plan[]>([]);
    const router = useRouter();

    useEffect(() => {
        setLoadingTable(true)
    }, []);

    const listPlans = async () => {
        const data = await getAllPlan()
        if (data?.msg) {

        } else {
            setPlan(data.data)
        }
        setLoadingTable(false);
        return data
    }

    const handleModify = (record: any) => {
        return `/dashboard/plans/${record.id}/edit`;
    }

    const data: Plan[] = plan

    const columns: TableColumnsType<Plan> = [
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
            title: 'Costo',
            dataIndex: 'cost',
            key: 'cost',
            align: 'right',
            render: (text) => <NumberFormat number={text} />,
        },
        {
            title: 'Creditos',
            dataIndex: 'credits',
            key: 'credits',
            align: 'right',
            render: (text) => <NumberFormat number={text} />,
        },
        {
            title: 'Bots',
            dataIndex: 'bots',
            key: 'bots',
            align: 'right',
            render: (text) => <NumberFormat number={text} />,
        },
        {
            title: 'Documentos',
            dataIndex: 'documents',
            key: 'documents',
            align: 'right',
            render: (text) => <NumberFormat number={text} />,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            align: 'center',
            render: (record: { key: React.Key }) =>
                data.length >= 1 ? (
                    <Space size="middle">
                        <Flex wrap="wrap" gap="small">
                            <Tooltip title="MODIFICAR" >
                                <Link
                                    onClick={() => setLoadingTable(true)}
                                    href={handleModify(record)}
                                    style={{ minWidth:'32PX', paddingInlineStart:'0', paddingInlineEnd: '0',  borderRadius: '50%', justifyContent: 'center'}}
                                    className="flex items-center rounded-lg bg-green-600 px-2 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    <PencilIcon className="h-4" />
                                </Link>
                            </Tooltip>
                            <Tooltip title="ELIMINAR" >
                                <Button
                                    type="primary"
                                    onClick={() => handleDelete(record)}
                                    shape="circle" icon={<DeleteOutlined />}
                                    style={{ background: 'red' }} />
                            </Tooltip>
                        </Flex>
                    </Space>
                ) : null,
        },
    ]

    const handleDelete = (key: any) => {
        deleteItem(key.id)
    }

    const deleteItem = async (id: number) => {
        setLoadingTable(true)
        const res = await deletePlan(id)
        if(res?.data?.error) {            
            alert(res?.data.error.meta.cause)
            //setLoadingTable(false)
        } else if(res.data?.msg) {
            alert(res.data?.msg)
            //setLoadingTable(false)
        } else {
            const m = 'Successfully Deleted Plan' 
            alert(m)            
        }
        listPlans()
        

    }
    const handleSearch = (newItems: any) => {
        setLoadingTable(true)
        if(newItems.response?.data) {
            setPlan(newItems.response?.data)
            setLoadingTable(newItems?.loading)
        } else {
            setLoadingTable(false)
        }      
      };


    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className={`${lusitana.className} text-2xl`}>Plans</h1>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                        <InputSearchComponent placeholder="Search plan...." url="plan/filtered/searchString?searchString=" onSearch={handleSearch} inputId="inp-search-plan"/>

                        {/* <Search placeholder="Search Plans..." /> */}

                        <BtnLinkComponent href="/dashboard/plans/create" label="Create Plan" />
                    </div>
                    <div className="mt-4 flex">
                    <Skeleton loading={loadingTable}>
                        <AppTable columns={columns} data={data} title="LISTADO DE PLANES" />
                    </Skeleton>
                    </div>
                </div>
            </Skeleton>
        </Space>
    );
};

export default App;