"use client";
import { Company } from "@/app/lib/model/company-model"
import { CheckBadgeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { setUserProfile } from "@/app/lib/features/userSlice";
import { updateCompnay } from "@/app/lib/services/company.service";
import { Skeleton, Space } from "antd";
import { CloseCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import CustomBtnToolTip from "../components/btn-tooltip-component";


const CompanyForm: React.FC = () => {
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
    const [loading, setLoading] = useState<boolean>(true);
    const [btnAaddLoading, setBtnAaddLoading] = useState<boolean>(false);
    const [btnCancelLoading, setBtnCancelLoading] = useState<boolean>(false);

    useEffect(() => {
        assignDataCompany()
        setLoading(false)
    }, [dataUser]);

    const handleSubmit = async () => {
        const { invoice, member, ...dataCompany } = company
        let id = company.id
        const dataResponse = await updateCompnay(id.toString(), dataCompany)
        const { data, message, statusCode } = dataResponse ?? {}
        if (data?.msg) {
            const mensaje = data.msg
            alert(mensaje)
        } else {
            const dataUserPerfil = { ...dataUser, company: data }
            dispatch(setUserProfile(dataUserPerfil))
            alert(message)
        }
        setBtnAaddLoading(false)
    }

    const setData = (event: ChangeEvent<HTMLInputElement>, property: string) => {
        return setCompany({ ...company, [property]: event.target.value })
    }

    const handleAddClick = () => {
        setBtnAaddLoading(true)
        handleSubmit()        
    };

    const handleCancelClick = () => {
        setBtnCancelLoading(false)
        assignDataCompany()
    }

    const assignDataCompany = () => {
        const { company, ...userProfile } = dataUser ?? null
        setCompany({ ...dataCompany, name: '' })
        setCompany({
            ...dataCompany,
            id: company?.id || 0,
            name: company?.name || '',
            rif: company?.rif || '',
            numberphone: company?.numberphone || '',
            addres: company?.addres || '',
        })
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Skeleton loading={loading}>
                <div className="space-y-1 flex-col-2">
                    <form key={1} className="space-y-2">

                        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-1">
                            <div>
                                <label
                                    className="mb-3 block text-xs font-medium text-gray-900"
                                    htmlFor="firstname"
                                >
                                    Name
                                </label>

                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter Name"
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
                                        placeholder="Enter RIF"
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
                                     Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="numberPhone"
                                        type="text"
                                        name="numberPhone"
                                        placeholder="Enter Phone Number"
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
                                    Address
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="address"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={company.addres}
                                        onChange={(event) => setCompany({ ...company, addres: event.target.value })}
                                    ></textarea>
                                    <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end gap-2" style={{ background: '#8080804f', padding: '5px' }}>
                            <CustomBtnToolTip
                                title="REGISTER"
                                loading={btnAaddLoading}
                                onClick={() => handleAddClick()}
                                icon={<PoweroffOutlined />}
                                background="blue"
                            >
                                Save
                            </CustomBtnToolTip>

                            <CustomBtnToolTip
                                title="CANCEL"
                                loading={btnCancelLoading}
                                onClick={() => handleCancelClick()}
                                icon={<CloseCircleOutlined />}
                                background="green"
                            >
                                Cancel
                            </CustomBtnToolTip>
                        </div >

                    </form>
                </div>
            </Skeleton>
        </Space>
    )
}

export default CompanyForm