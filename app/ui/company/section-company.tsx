"use client";
import CompanyForm from "./company-form";
import PlanForm from "./plan-form";
import AppTabCompany from "./tab-company";
import type { TabsProps } from 'antd';

const SectionCompany = () => {    

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'REGISTER',
            children: [<div key={1} className="space-y-1"> <CompanyForm /> </div>],
        },
        {
            key: '2',
            label: 'PLAN',
            children: [<div key={2} className="space-y-1"> <PlanForm /> </div>],
        },
        {
            key: '3',
            label: 'INVOICES',
            children: [<form key={3}><h1>List invoices</h1></form>],
        },
    ];
    return (
        <>
            <div className="space-y-1">
                {<AppTabCompany items={items} />}
            </div>
        </>
    )
}
export default SectionCompany;
