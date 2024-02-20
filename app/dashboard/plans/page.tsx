"use client";
import { useEffect, useState } from 'react';
import { Button, Flex, Skeleton, Space, TableColumnsType, Tooltip } from 'antd';
import AppTable from '@/app/ui/table-component';
import { Plan } from '@/app/lib/model/plan-model';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import NumberFormat from '@/app/ui/components/number-format';
import { getAllPlan } from '@/app/lib/services/plan.service';
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Search from '@/app/ui/search';
import BtnLinkComponent from '@/app/ui/components/btn-link-component';
import InputSearchComponent from '@/app/ui/components/input-search-componet';
import { debounceTime, from, of, switchAll, switchMap } from 'rxjs';
import { ResponseModel } from '@/app/lib/model/reponse-model';

const App: React.FC = ({
    searchParams
}: {
    searchParams?: {
        query?: string
    }
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [plan, setPlan] = useState<Plan[]>([]);
    const router = useRouter();

    useEffect(() => {
        listPlans()
    }, []);

    const listPlans = async () => {
        const data = await getAllPlan()
        if (data?.msg) {

        } else {
            setPlan(data.data)
        }
        setLoading(false);
        return data
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
                                    href="/dashboard/plans/create"
                                    className="flex h-6 items-center rounded-lg bg-green-600 px-2 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    <PencilIcon className="h-4" />
                                </Link>
                                {/* <Button
                                    type="primary"
                                    onClick={() => handleDelete(record)}
                                    shape="circle" icon={<EditOutlined />}
                                    style={{ background: 'blue' }} /> */}
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
        console.log('pasooooooo', key)

    }

    const handleAdd = () => {
        router.push("/dashboard");
    }

    const handleSearch = (newItems: any) => {
        console.log(newItems);
      };


    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className={`${lusitana.className} text-2xl`}>Plans</h1>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                        <InputSearchComponent placeholder="Search plan...." url="plan/filteredplans?searchString=" onSearch={handleSearch} inputId="inp-search-plan"/>

                        {/* <Search placeholder="Search Plans..." /> */}

                        <BtnLinkComponent href="/dashboard/plans/create" label="Create Plan" />
                    </div>
                    <div className="mt-4 flex">
                        <AppTable columns={columns} data={data} title="LISTADO DE PLANES" />
                    </div>
                </div>
            </Skeleton>
        </Space>
    );
};

export default App;