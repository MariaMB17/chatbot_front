"use client";
import Breadcrumbs from "@/app/ui/components/breadcrumb-component";
import { lusitana } from "@/app/ui/fonts";
import CreateForm from "@/app/ui/plans/create-form";
import { Skeleton, Space } from "antd";
import { useState } from "react";


const Page: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col space-y-1.5" style={{ paddingTop: '5px' }}>
                <Breadcrumbs breadcrumbs={[{label: 'Dasboard', href: '/dashboard/plans', active: false }, 
                    {label: 'Create', href: '/dashboard/plans/create', active: true }]} />
                    <div className="flex w-full items-center justify-between p-2">                    
                        <h1 className={`${lusitana.className} text-2xl`}>
                            CREAR PLAN
                        </h1>                        
                    </div>
                    <CreateForm />
                </div>
            </Skeleton>
        </Space>
    );
}

export default Page