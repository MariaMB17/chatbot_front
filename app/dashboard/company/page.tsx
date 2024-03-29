"use client";
import SectionCompany from "@/app/ui/company/section-company"
import { Skeleton, Space } from "antd";
import { useState } from "react";


const Page: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return(
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col space-y-1.5" style={{ paddingTop: '10px' }}>
                    
                <SectionCompany/>
                </div>
            </Skeleton>
        </Space>
    )

    
}

export default Page