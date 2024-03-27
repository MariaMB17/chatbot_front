'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import HeroImag from '@/app/ui/hero-imag';
import { useAuth } from '@/handlers/useAuth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {

  const auth = useAuth();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        {<AcmeLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <div className={styles.shape}></div> */}
          <p className={`text-xl text-gray-800 md:text-2xl md:leading-normal`}>
            <strong>Bienvenido a ChatBot.</strong> Chat IA Empresarial{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Interactua a preguntas de tus clientes
            </a>
            , traemos tu asistente inteligente IA.
          </p>
          <header>
            <nav>
              {auth ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                >
                  <span>Inicio</span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                >
                  <span>Entrar </span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
              )}
            </nav>
          </header>

          {/* <h1 className="w-5 md:w-6">I'm blue!</h1> */}

        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {<HeroImag />}
        </div>
      </div>
    </main>
  );
}
