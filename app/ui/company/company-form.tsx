"use client";
import { Company } from "@/app/lib/model/company-model"
import { ArrowRightIcon, CheckBadgeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../button";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { fetchUserData, getUserProfile, setUserProfile } from "@/app/lib/features/user";
import { UserProfile } from "@/app/lib/model/user-profile-model";
import { updateCompnay } from "@/app/lib/services/company.service";
import { getPlanById } from "@/app/lib/services/plan.service";
import { ResponseModel } from "@/app/lib/model/reponse-model";


const CompanyForm = () => {
    const dataCompany: Company = {
        id: 0,
        name: '',
        rif: '',
        addres: '',
        numberphone: '',
        member: [],
        invoice: []
    }

    const [company, setCompany] = useState<Company>(dataCompany);
    const dispatch = useAppDispatch();
    const { dataUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        console.log(dataUser)
        const {company, ...userProfile} = dataUser ?? null
        setCompany({ ...dataCompany, name: '' })
        setCompany({
            ...dataCompany,
            id: company?.id || 0,
            name: company?.name || '',
            rif: company?.rif || '',
            numberphone: company?.numberphone || '',
            addres: company?.addres || '',
        })
    }, [dataUser]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { invoice, member, ...dataCompany } = company
        let id = company.id
        const dataSave = { company: dataCompany }
        const dataResponse = await updateCompnay(id.toString(), dataSave)
        const { data, message, statusCode } = dataResponse ?? {}
        if (data.data?.msg) {
            const mensaje = data.data.msg
            alert(mensaje)
        } else {
            const dataUserPerfil = { ...dataUser, company: data }
            dispatch(setUserProfile(dataUserPerfil))
            alert(message)
        }
    }

    const setData = (event: ChangeEvent<HTMLInputElement>, property: string) => {
        return setCompany({ ...company, [property]: event.target.value })
    }

    return (
        <div className="space-y-1 flex-col-2">
            <form key={1} className="space-y-2" onSubmit={handleSubmit}>
                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-1">
                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="firstname"
                        >
                            Nombre
                        </label>

                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="Introduzca nombres"
                                value={company.name}
                                onChange={(event) => setData(event, 'name')}
                                required
                            />
                            <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">


                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="rif"
                        >
                            RIF
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="rif"
                                type="text"
                                name="rif"
                                placeholder="Introduzca rif"
                                value={company.rif}
                                onChange={(event) => setData(event, 'rif')}
                                required
                            />
                            <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="numberPhone"
                        >
                            Telefono
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="numberPhone"
                                type="text"
                                name="numberPhone"
                                placeholder="Introduzca numero de telefono"
                                value={company.numberphone}
                                onChange={(event) => setData(event, 'numberphone')}
                                required
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-1">
                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="address"
                        >
                            Direccion
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="address"
                                name="address"
                                placeholder="Introduzca Direccion"
                                value={company.addres}
                                onChange={(event) => setCompany({ ...company, addres: event.target.value })}
                            ></textarea>
                            <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                </div>
                <Button className="mt-2 w-full" type="submit">
                    ACEPTAR
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </form>
        </div>
    )
}

export default CompanyForm