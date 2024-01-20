'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ItemMenu, ItemMenuConfig } from '@/app/lib/data-menu';
import { useState } from 'react';
import { Button } from '../button';
import { ArrowRightIcon, CogIcon, HomeIcon, LinkIcon } from '@heroicons/react/24/outline';

//const links = ItemMenu;

export default function NavLinks() {
  const [links, setLinks] = useState(ItemMenu);
  const [btnHome, setBtnHome] = useState(false);
  const pathname = usePathname();

  let IconConfig = CogIcon
  const IconHome = HomeIcon
  const changeItemMenu = () => {
    const newLinks = ItemMenuConfig;
    setBtnHome(!btnHome)
    if (btnHome) {
      setLinks(ItemMenu);
    } else {
      setLinks(newLinks);
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
