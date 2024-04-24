"use client";
import { Plan } from '@/app/lib/model/plan-model';
import { getPlanById } from '@/app/lib/services/plan.service';
import Breadcrumbs from '@/app/ui/components/breadcrumb-component';
import { lusitana } from '@/app/ui/fonts';
import CreateForm from '@/app/ui/plans/create-form';
import { Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react'


const page = ({ params }: { params: { id: string } }) => {
    const dataPlan: Plan = {
        id: 0,
        name:'',
        description:'',
        cost:0,
        credits:0,
        bots: 0,
        documents: 0,
        members: 0,
        member: []
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [plan, setPlan] = useState<Plan>(dataPlan);

    const handleRedirect = () => {
        const id = params.id;
        return `/dashboard/plans/${id}/edit`;
    }

    const dataBreadCrumb = [
        { label: 'Dasboard', href: '/dashboard/plans', active: false },
        { label: 'Edit', href: handleRedirect(), active: true }
    ]

    useEffect(() => {
        planById()
    }, []);

    const planById = async () => {
        setLoading(true)
        const id = params.id;
        const data = await getPlanById(+id)
        if (data?.msg) {
            alert(data?.msg)
        } else {
            setPlan(data.data)
        }
        setLoading(false);
        return data
    }
    
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>

                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col space-y-1.5" style={{ paddingTop: '5px' }}>
                    <Breadcrumbs breadcrumbs={dataBreadCrumb} />
                    <div className="flex w-full items-center justify-between p-2">
                        <h1 className={`${lusitana.className} text-2xl`}>
                            EDIT PLAN
                        </h1>
                    </div>
                    <CreateForm valuePlan={plan}/>
                </div>
            </Skeleton>
        </Space>
    )
}

export default page