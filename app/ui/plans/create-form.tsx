import { Plan } from "@/app/lib/model/plan-model"
import { CheckBadgeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import CustomBtnToolTip from "../components/btn-tooltip-component";
import { CloseCircleOutlined, PoweroffOutlined } from "@ant-design/icons";

interface errorsInterface {
    name: string,
    description: string,
    cost: string,
    credits: string,
    bots: string,
    documents: string,
    members: string,
}

const CreateForm = () => {
    const [btnAaddLoading, setBtnAaddLoading] = useState<boolean>(false);
    const [btnCancelLoading, setBtnCancelLoading] = useState<boolean>(false);

    const dataPlan: Plan = {
        id: 0,
        name: '',
        description: '',
        cost: 0,
        credits: 0,
        bots: 0,
        documents: 0,
        members: 0,
        member: []
    }

    const dataErros = {
        name: '',
        description: '',
        cost: '',
        credits: '',
        bots: '',
        documents: '',
        members: '',
    }
    const [plan, setPlan] = useState<Plan>(dataPlan);
    const [errors, setErrors] = useState<errorsInterface>(dataErros);
    const registerPlanBtn = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault()
        console.log(plan)
        //const result = await createPlan(plan)
        //console.log(result)
    }

    const setData = (event: ChangeEvent<HTMLInputElement>, property: string) => {
        const d = typeof event.target.value
        //@ts-ignore
        const n = (isNaN(d)) ? event.target.value : parseFloat(event.target.value)
        console.log(n, typeof n, d)
        return setPlan({ ...plan, [property]: d ? event.target.value : +event.target.value })
    }

    const handleAddClick = () => {
        const e = validateForm()
        console.log(e)
        setErrors(e)
    }

    const handleCancelClick = () => { 
        setErrors(dataErros)
    }

    const validateForm = () => {
        const newErrors: errorsInterface = dataErros;
        const name = (plan.name).toUpperCase()
        if (!plan.name.trim()) {
            newErrors.name = 'Name is required.';
        } if (plan.name.length > 250) {
            newErrors.name += ' Name only can has 250 caracteres.';
        }

        if (plan.cost === 0 && name !== 'FREE') {
            newErrors.cost = "Cost can't has equal to 0 ";
        } else if ((plan.cost).toString.length > 9) {
            newErrors.cost = 'Cost only can has 9 caracteres.';
        }

        if (plan.credits === 0 && name !== 'FREE') {
            newErrors.credits = "Credits can't has equal to 0 ";
        } else if ((plan.credits).toString.length > 5) {
            newErrors.credits = 'Credits only can has 5 caracteres.';
        }

        if (plan.bots === 0 && name !== 'FREE') {
            newErrors.bots = "Bots can't has equal to 0 ";
        } else if ((plan.bots).toString.length > 5) {
            newErrors.bots = 'Bots only can has 5 caracteres.';
        }

        if (plan.documents === 0 && name !== 'FREE') {
            newErrors.documents = "Documents can't has equal to 0 ";
        } else if ((plan.documents).toString.length > 5) {
            newErrors.documents = 'Documents only can has 5 caracteres.';
        }

        if (plan.members === 0 && name !== 'FREE') {
            newErrors.members = "Members can't has equal to 0 ";
        } else if ((plan.members).toString.length > 5) {
            newErrors.members = 'Members only can has 5 caracteres.';
        }
        return newErrors
    }

    return (
        <div className="space-y-1 flex-col-2">
            <form key={2} className="space-y-2">
                <div className="flex-1 rounded-lg bg-gray-50 px-1 pb-1 pt-2">
                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-1">
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="name"
                            >
                                Name
                            </label>

                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={plan.name}
                                    onChange={(event) => setData(event, 'name')}
                                    required
                                    maxLength={250}
                                />
                                <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.name}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">


                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="cost"
                            >
                                Cost
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="cost"
                                    type="number"
                                    name="cost"
                                    placeholder="Enter cost"
                                    value={plan.cost}
                                    onChange={(event) => setData(event, 'cost')}
                                    required
                                    maxLength={9}
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.cost}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="credits"
                            >
                                Credits
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="credits"
                                    type="number"
                                    name="credits"
                                    placeholder="Enter Credits"
                                    value={plan.credits}
                                    onChange={(event) => setData(event, 'credits')}
                                    required
                                    maxLength={5}
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.credits}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-3">
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="bots"
                            >
                                Bots
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="bots"
                                    type="number"
                                    name="bots"
                                    placeholder="Enter Bots"
                                    value={plan.bots}
                                    onChange={(event) => setData(event, 'bots')}
                                    required
                                    maxLength={5}
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.bots}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="documents"
                            >
                                Number of Documents
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="documents"
                                    type="number"
                                    name="documents"
                                    placeholder="Enter Number of Documents"
                                    value={plan.documents}
                                    onChange={(event) => setData(event, 'documents')}
                                    required
                                    maxLength={5}
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.documents}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="members"
                            >
                                Number Members
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="members"
                                    type="number"
                                    name="members"
                                    placeholder="Enter Number Members"
                                    value={plan.members}
                                    onChange={(event) => setData(event, 'members')}
                                    required
                                    maxLength={5}
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <p style={{ position: 'absolute', color: 'red', width: '100%', fontSize: '12px', padding: '0px 3px' }}>
                                    {errors.members}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-1">
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="description"
                            >
                                Descripcion
                            </label>
                            <div className="relative">
                                <textarea
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="description"
                                    name="description"
                                    placeholder="Introduzca Descripcion"
                                    value={plan.description}
                                    onChange={(event) => setPlan({ ...plan, description: event.target.value })}
                                ></textarea>
                                <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
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
    )


}

export default CreateForm