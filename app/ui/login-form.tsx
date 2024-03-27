"use client";

import { lusitana } from '@/app/ui/fonts';
import { useSessionContext } from '@/context/SessionAuthProvider';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosAction } from '../lib/api-service';
import { getToken, setToken } from '../lib/features/auth';
import { setUserProfile } from '../lib/features/user';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { ResponseModel } from '../lib/model/reponse-model';
import { User } from '../lib/model/user-model';
import { UserProfile } from '../lib/model/user-profile-model';
import { getPlanById } from '../lib/services/plan.service';
import { Button } from './button';

export default function LoginForm() {

  const { session, setSession } = useSessionContext();

  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { userEmail } = useAppSelector((state) => state.auth);
  const { dataUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getToken())
    setEmail(userEmail)
    setPassword("")
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataUsuario: User = {
      email,
      password
    }

    try {
      const user: ResponseModel = await axiosAction.post(`auth/signin`, dataUsuario)
      const { data, message, statusCode } = user ?? {}
      if (data.data?.access_token) {
        dispatch(setToken({
          token: data.data?.access_token,
          email: data.data?.email
        }))
        perfilUser(data.data?.id)
        router.push("/dashboard");
        router.refresh();
      } else {
        const mensaje = data.data.msg
        alert(mensaje)
        if (mensaje === 'No existe usuario registrado en nuestra bd con ese email') {
          //router.push("/userRegister")
          //router.refresh();
        }
        toast('Toast is good', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'bottom-right'
        });
      }
    } catch (error) {
      toast.error('Error al iniciar sesion')
    }
  }

  const perfilUser = async (userId: number) => {
    try {
      const perfilUser = await axiosAction.get(`users/${userId}`)
      const { Profile, Member, ...user } = perfilUser.data.data ?? null

      const dataPerfilUser: UserProfile = {
        user,
        name: '',
        profile: Profile,
        company: Member.company,
        member: Member
      }
      dataPlan(Member.planId, dataPerfilUser)
    } catch (error) {
      setSession({})
    }
  }

  const dataPlan = async (id: number, data?: UserProfile) => {
    const dataPlan: ResponseModel = await getPlanById(id)
    if (dataPlan) {
      const plan = dataPlan.data
      const dataU = {
        ...data,
        plan
      }
      dispatch(setUserProfile(dataU))
    } else {
      dispatch(setUserProfile(data))
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
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
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
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
                name="password"
                type="password"
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
        <LoginButton />
        <Link
          href="/userRegister"
          className="flex gap-5 items-center self-start rounded-lg px-6 py-3 text-sm font-medium text-blue transition-colors md:text-base"
        >
          <span style={{ fontSize: '13px', fontWeight: '400', color: 'blue', width: '100%', textAlign: 'end' }}>Registrarse</span>
        </Link>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}
function LoginButton() {
  return (
    <Button className="mt-4 w-full" type="submit">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
