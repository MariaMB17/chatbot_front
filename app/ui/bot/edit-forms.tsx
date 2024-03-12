'use client'

import { updateBot } from '@/app/lib/actions-bot';
import { Button } from '@/app/ui/button';
import { CheckIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, CpuChipIcon, CubeTransparentIcon, GlobeAltIcon, MegaphoneIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface KnowledgeProps {
    id: number;
    name: string;
}

interface KnowledgeOnBotProps {
    knowledge: KnowledgeProps[]
}

interface BotsProps {
    id: number;
    name: string;
    description: string;
    modelgpt: string;
    personality: string;
    nickname: string;
    knnowledgeOnBot: KnowledgeOnBotProps[];
}

interface personalityBot {
    id: number,
    name: string,
    description: string,
}

const porpuses: personalityBot[] = [
    {
        id: 1,
        name: 'Factual',
        description: 'Proporciona respuestas precisas utilizando su base de conocimientos.'
    },

    {
        id: 2,
        name: 'Creativo',
        description: 'Facilita la generación de contenido creativo impulsado por IA'
    },

    {
        id: 3,
        name: 'Mesa de Ayuda para Empleados',
        description: 'Ayuda a abordar las consultas de los empleados y las pautas de recursos humanos.'
    },

    {
        id: 4,
        name: 'Marketing',
        description: 'Contribuye en la planificación estratégica, elaboración de contenido de marketing y redes sociales.'
    },
    {
        id: 5,
        name: 'Guiado',
        description: 'Realiza sesiones integrales de formación guiada.'
    },

    {
        id: 6,
        name: 'Apoyo Técnico',
        description: 'Proporciona soporte técnico y ofrece ayuda para la resolución de problemas.'
    },

    {
        id: 7,
        name: 'Atención al cliente',
        description: 'Ofrece soluciones rápidas y efectivas a las consultas de los clientes.'
    },

    {
        id: 8,
        name: 'IA Básica',
        description: 'Utilice su modelo de IA preferido sin una base de conocimientos.'
    },
]

export default function EditBotForm(
    { bots,
        knowledges,
        knowledgeOnBots
    }:
        {
            bots: BotsProps,
            knowledges: KnowledgeProps[],
            knowledgeOnBots: KnowledgeProps[]
        }) {

    const member_id = 1;
    const initialState = { message: null, errors: {} };
    const updateBotWithMemberId = updateBot.bind(null, bots.id, member_id);
    const [state, dispatch] = useFormState(updateBotWithMemberId, initialState);
    const [lists, setLists] = useState
        <{
            lista1: KnowledgeProps[];
            lista2: KnowledgeProps[]
        }>({
            lista1: knowledgeOnBots.length > 0 ? knowledges.filter(item => !knowledgeOnBots.some(knowledgeItem => knowledgeItem.id === item.id)) : knowledges.length > 0 ? [...knowledges] : [],
            lista2: knowledgeOnBots.length > 0 ? [...knowledgeOnBots] : [],
        });

    const router = useRouter();

    // Mensajes del Form Action
    useEffect(() => {
        if (state.message) {
            state.errors?.name && state.errors.name.map((error: string) => {
                handleErrorsToast(error)
            });
            state.errors?.nickname && state.errors.nickname.map((error: string) => {
                handleErrorsToast(error)
            });
            state.errors?.modelgpt && state.errors.modelgpt.map((error: string) => {
                handleErrorsToast(error)
            });
            state.errors?.description && state.errors.description.map((error: string) => {
                handleErrorsToast(error)
            });
            state.errors?.personality && state.errors.personality.map((error: string) => {
                handleErrorsToast(error)
            });
            handleErrorsToast(state.message);
        };
    }, [state])

    // const redirectToDashboard = () => {
    //   setTimeout(() => {
    //     router.push("/dashboard/bots");
    //     router.refresh();
    //   }, 2000);
    // };

    const handleErrorsToast = (
        message: string,
        success: boolean = false) => {

        if (success) {
            toast.success(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(message, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    backgroundColor: '#FECACA',
                    color: '#B91C1C',
                },
            });
        }
    };

    const moveName = (
        id: number,
        fromList: KnowledgeProps[],
        toList: KnowledgeProps[]) => {
        setLists(prevLists => ({
            ...prevLists,
            [fromList === lists.lista1 ? 'lista1' : 'lista2']: prevLists[fromList === lists.lista1 ? 'lista1' : 'lista2'].filter(item => item.id !== id),
            [toList === lists.lista1 ? 'lista1' : 'lista2']: [...prevLists[toList === lists.lista1 ? 'lista1' : 'lista2'], fromList.find(item => item.id === id)!],
        }));
    };

    const moveAllNames = (
        fromList: KnowledgeProps[],
        toList: KnowledgeProps[]) => {
        setLists(prevLists => ({
            ...prevLists,
            [fromList === lists.lista1 ? 'lista1' : 'lista2']: [],
            [toList === lists.lista1 ? 'lista1' : 'lista2']: [...prevLists[toList === lists.lista1 ? 'lista1' : 'lista2'], ...fromList],
        }));
    };

    const listVariants = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div>
            <form action={dispatch}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* name */}
                    <div className='flex gap-4'>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                Nombre:
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        defaultValue={bots.name}
                                        placeholder="nombre..."
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <CubeTransparentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* nickname */}
                        <div className="mb-4 w-1/2">
                            <label htmlFor="nickname" className="mb-2 block text-sm font-medium">
                                Alias:
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="nickname"
                                        name="nickname"
                                        type="text"
                                        defaultValue={bots.nickname}
                                        placeholder="alias..."
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        autoComplete="on"
                                    />
                                    <UserPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* descripcion */}
                    <div className="mb-4">
                        <label htmlFor="description" className="mb-2 block text-sm font-medium">
                            Descripción:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    defaultValue={bots.description}
                                    placeholder="Descripción"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <CpuChipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    {/* Modelo GPT */}
                    <div className="mb-4">
                        <fieldset>
                            <legend className="mb-2 block text-sm font-medium">
                                Modelo:
                            </legend>

                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className="flex gap-4">

                                    {/* Plan Free */}
                                    <div className="flex items-center">
                                        <input
                                            id="free"
                                            name="modelgpt"
                                            type="radio"
                                            value="free"
                                            defaultChecked={bots.modelgpt === 'free'}
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="free"
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                        >
                                            Free <GlobeAltIcon className="h-4 w-4" />
                                        </label>
                                    </div>

                                    {/* Plan Basico */}
                                    <div className="flex items-center">
                                        <input
                                            id="basic"
                                            name="modelgpt"
                                            type="radio"
                                            value="basic"
                                            defaultChecked={bots.modelgpt === 'basic'}
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="basic"
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            Básico <CheckIcon className="h-4 w-4" />
                                        </label>
                                    </div>

                                    {/* Plan Premium */}
                                    <div className="flex items-center">
                                        <input
                                            id="premium"
                                            name="modelgpt"
                                            type="radio"
                                            value="premium"
                                            defaultChecked={bots.modelgpt === 'premium'}
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="premium"
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            Premium <CheckIcon className="h-4 w-4" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Personality */}
                    <div className="mb-4">
                        <label htmlFor="personality" className="mb-2 block text-sm font-medium">
                            Personalidad del Bot ...
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <select
                                    id="personality"
                                    name="personality"
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    defaultValue={bots.personality}
                                >
                                    <option value='' disabled>
                                        Seleccione el proposito del bot
                                    </option>
                                    {porpuses.map((porpuse) => (
                                        <option key={porpuse.id} value={porpuse.id}>
                                            {porpuse.name}
                                        </option>
                                    ))}
                                </select>
                                <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Knowledge */}
                    <div className="flex justify-center mb-4">
                        <div className="w-1/2">
                            <h1 className="text-sm font-medium text-left">Base de Conocimiento:</h1>
                            <motion.div variants={listVariants} initial="hidden" animate="visible">
                                <ul className="border p-4 h-48 overflow-y-auto">
                                    {lists.lista1.map(({ id, name }) => (
                                        <motion.li key={id} variants={itemVariants} className="flex justify-between items-center mb-2 bg-white rounded-md shadow-sm hover:shadow-lg">
                                            <span>{name}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                onClick={() => moveName(id, lists.lista1, lists.lista2)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                            >
                                                <ChevronRightIcon className="h-5 w-5" />
                                            </motion.button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => moveAllNames(lists.lista1, lists.lista2)}
                                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600" type="button"
                            >
                                <ChevronDoubleRightIcon className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => moveAllNames(lists.lista2, lists.lista1)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" type="button"
                            >
                                <ChevronDoubleLeftIcon className="h-5 w-5" />
                            </motion.button>
                        </div>
                        <div className="w-1/2">
                            <h1 className="text-sm font-medium text-right">Conocimiento Agregado:</h1>
                            <motion.div variants={listVariants} initial="hidden" animate="visible">
                                <ul
                                    className="border p-4 h-48 overflow-y-auto">
                                    {lists.lista2.map(({ id, name }) => (
                                        <motion.li key={id} variants={itemVariants} className="flex justify-between items-center mb-2 bg-white rounded-md shadow-sm hover:shadow-lg">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                onClick={() => moveName(id, lists.lista2, lists.lista1)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                            >
                                                <ChevronLeftIcon className="h-5 w-5" />
                                            </motion.button>
                                            <span>{name}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    {/* Knowledge idsKnowleds Selected*/}
                    <input
                        id="idsKnowledge"
                        name="idsKnowledge"
                        type="text"
                        value={JSON.stringify(`${lists.lista2.length > 0 ? lists.lista2.map(item => item.id) : []}`)}
                        readOnly
                        hidden
                    />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/bots"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancelar
                    </Link>
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
        </div>
    );
}
