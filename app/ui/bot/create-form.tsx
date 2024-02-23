'use client'

import { createBot } from '@/app/lib/actions-bot';
import { Button } from '@/app/ui/button';
import { CheckIcon, CpuChipIcon, CubeTransparentIcon, GlobeAltIcon, MegaphoneIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface KnowledgeProps {
  id: number;
  name: string;
  createdAt: string,
  updatedAt: string,
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

export default function CreateBotForm() {

  const member_id = 1;
  const initialState = { message: null, errors: {}, success: false };
  const createBotWithMemberId = createBot.bind(null, member_id);
  const [state, dispatch] = useFormState(createBotWithMemberId, initialState);

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
      if (state.message) {
        handleErrorsToast(state.message, state.success)
      }

      if (state.success) {
        const redirectToDashboard = () => {
          setTimeout(() => {

          }, 2500);
        };
      }
    };
  }, [state])

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
                    placeholder="nombre..."
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    autoComplete="on"
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
                  defaultValue=''
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
