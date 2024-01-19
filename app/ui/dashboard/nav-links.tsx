'use client';
import {
  ChartBarIcon,
  Cog6ToothIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },

  {
    name: 'Knowledge',
    href: '/dashboard/knowledge',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Bot',
    href: '/dashboard/bots',
    icon: CubeIcon,
  },
  {
    name: 'Chat',
    href: '/dashboard/chats',
    icon: UserGroupIcon
  },
  {
    name: 'Logs',
    href: '/dashboard/logs',
    icon: ChartBarIcon
  },
  {
    name: 'Account',
    href: '/dashboard/account',
    icon: Cog6ToothIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
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
    </>
  );
}
