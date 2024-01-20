import {
    DocumentDuplicateIcon,
    HomeIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    CogIcon
} from "@heroicons/react/24/outline";
import { Menu } from "./model/menu-model";

export const ItemMenu: Menu[] = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: HomeIcon
    },
    {
        name: 'Compañia',
        href: '/dashboard/company',
        icon: BuildingOfficeIcon

    }
]

export const ItemMenuConfig: Menu[] = [
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