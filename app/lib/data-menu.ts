import { 
    DocumentDuplicateIcon, 
    HomeIcon, 
    UserGroupIcon, 
    BuildingOfficeIcon 
} from "@heroicons/react/24/outline";
import { Menu } from "./model/menu-model";

export const ItemMenu: Menu[] = [
    { 
        name: 'Home',
        href: '/dashboard',
        icon: HomeIcon
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
    },
    {
        name: 'Compañia',
        href: '/dashboard/company',
        icon: BuildingOfficeIcon 

    },
]