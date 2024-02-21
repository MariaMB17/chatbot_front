"use client";

import { Profile } from "@/app/lib/model/profile-model";
import { ResponseModel } from "@/app/lib/model/reponse-model";
import { User } from "@/app/lib/model/user-model";
import { UserProfile } from "@/app/lib/model/user-profile-model";
import { createUserProfile } from "@/app/lib/services/user-profile.service";
import { useSessionContext } from '@/context/SessionAuthProvider';
import { ArrowRightIcon, AtSymbolIcon, CheckBadgeIcon, KeyIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../button";
import { lusitana } from "../fonts";

const RegisterForm = () => {
    const { session, setSession } = useSessionContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [mobilphone, setMobilphone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [name, setName] = useState<string>(""); //Compañia
    const router = useRouter();
    const registerBtn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //const data = await createUserProfile
        const user: User = {
            email,
            password
        }

        const profile: Profile = {
            firstname,
            lastname,
            mobilphone,
            address,
            age: +age
        }
        const dataUserProfile: UserProfile = {
            user: user,
            profile,
            name
        }
        const response: ResponseModel = await createUserProfile(dataUserProfile)
        if (response.data?.msg) {
            const error = response.data.error?.meta?.target
            if (error === 'users_email_key') {
                alert('El correo ya existe')
            } else {
                alert(response.data?.msg)
            }
        } else {
            alert(response.message)
            setSession(response.data);
            console.log(response)
            router.push('/login')
        }
    }
    return (
        <div className="space-y-1 flex-col-2">
            <form onSubmit={registerBtn}>
                <div className="flex-1 rounded-lg bg-gray-50 px-1 pb-1 pt-2">
                    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                        Registrar usuario
                    </h1>
                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="firstname"
                            >
                                Nombres
                            </label>

                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    placeholder="Introduzca nombres"
                                    value={firstname}
                                    onChange={(event) => setFirstname(event.target.value)}
                                    required
                                />
                                <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="lastname"
                            >
                                Apellidos
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    placeholder="Introduzca apellidos"
                                    value={lastname}
                                    onChange={(event) => setLastname(event.target.value)}
                                    required
                                />
                                <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>

                        </div>

                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="mobilphone"
                            >
                                Telefono movil
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="mobilphone"
                                    type="text"
                                    name="mobilphone"
                                    placeholder="Introduzca telefono"
                                    value={mobilphone}
                                    onChange={(event) => setMobilphone(event.target.value)}
                                    required
                                />
                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>

                        </div>

                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="age"
                            >
                                Edad
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="age"
                                    type="number"
                                    name="age"
                                    placeholder="Introduzca la Edad"
                                    min={0}
                                    max={100}
                                    maxLength={3}
                                    value={age}
                                    onChange={(event) => setAge(event.target.value)}
                                />
                                <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Introduza email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                            </div>
                        </div>
                        <div className="mt-2">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 w-full grid grid-cols-1">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Compañia
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="name"
                                name="name"
                                placeholder="Introduzca el nombre de la compañia"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            ></textarea>
                            <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-2 w-full grid grid-cols-1">
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
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                            <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <Button className="mt-2 w-full" type="submit">
                        ACEPTAR
                        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default RegisterForm