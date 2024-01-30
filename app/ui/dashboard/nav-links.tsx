'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ItemMenu, ItemMenuConfig } from '@/app/lib/data-menu';
import { useState } from 'react';
import { Cog6ToothIcon, HomeIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function NavLinks() {
  const [links, setLinks] = useState(ItemMenu);
  const [btnHome, setBtnHome] = useState(false);
  const pathname = usePathname();

  let IconConfig = Cog6ToothIcon
  const IconHome = HomeIcon
  const router = useRouter();
  const changeItemMenu = () => {
    const newLinks = ItemMenuConfig;
    setBtnHome(!btnHome)
    if (btnHome) {
      setLinks(ItemMenu);
      router.push("/dashboard");
    } else {      
      setLinks(newLinks);
      router.push("dashboard/company")
    }
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}

      <button onClick={changeItemMenu} className={clsx(
        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
      )}>
        {btnHome ? <IconHome className="w-6" /> : <IconConfig className="w-6" />}
        <p className="hidden md:block">{btnHome ? 'Home' : 'Cuenta'}</p>
      </button>
    </>
  );
}
