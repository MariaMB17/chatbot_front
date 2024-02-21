import CreateBotForm from '@/app/ui/bot/create-form';
import Breadcrumbs from '@/app/ui/knowledge/breadcrumbs';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Bot',
};
export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Bots', href: '/dashboard/bots' },
                    {
                        label: 'Agregar',
                        href: '/dashboard/bots/create',
                        active: true,
                    },
                ]}
            />
            <CreateBotForm />
        </main>
    );
}