"use client";
import { lusitana } from "@/app/ui/fonts";
import CreateForm from "@/app/ui/plans/create-form";
import { Skeleton, Space } from "antd";
import { useState } from "react";


const Page: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col space-y-1.5" style={{ paddingTop: '10px' }}>
                    <div className="flex w-full items-center justify-between p-4">
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