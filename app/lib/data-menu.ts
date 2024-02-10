import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { Menu } from "./model/menu-model";

export const ItemMenu: Menu[] = [
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
]

export const ItemMenuConfig: Menu[] = [
  {
    name: 'Compañia',
    href: '/dashboard/company',
    icon: BuildingOfficeIcon

  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon
  }
];