"use client";
import { fetchUserData, setUserProfile } from "@/app/lib/features/user";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { ResponseModel } from "@/app/lib/model/reponse-model";
import { UserProfile } from "@/app/lib/model/user-profile-model";
import { getPlanById } from "@/app/lib/services/plan.service";
import type { TabsProps } from 'antd';
import { useEffect } from "react";
import CompanyForm from "./company-form";
import PlanForm from "./plan-form";
import AppTabCompany from "./tab-company";

const SectionCompany = () => {
    const dispatch = useAppDispatch();
    const { dataUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (dataUser.user.id === 0) {
            dispatchDataUser();
        }
    }, [dataUser]);

    const dispatchDataUser = async () => {
        const r = await dispatch(fetchUserData());
        if (r.payload) {
            const dataUP = r.payload as UserProfile
            dataPlan(dataUP.member?.planId || 0, dataUP)
        }
    }

    const dataPlan = async (id: number, data?: UserProfile) => {
        const dataPlan: ResponseModel = await getPlanById(id)
        if (dataPlan) {
            const plan = dataPlan.data
            const dataUs = {
                ...data,
                plan
            }
            dispatch(setUserProfile(dataUs))
        } else {
            dispatch(setUserProfile(data))
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'REGISTRO',
            children: [<div className="space-y-1"> <CompanyForm /> </div>],
        },
        {
            key: '2',
            label: 'PLAN',
            children: [<PlanForm />],
        },
        {
            key: '3',
            label: 'FACTURAS',
            children: [<form key={2}><h1>Listar Facturas</h1></form>],
        },
    ];
    return (
        <>
            <div className="space-y-1">
                <AppTabCompany items={items} />
            </div>
        </>
    )
}
export default SectionCompany;