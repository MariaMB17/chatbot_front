import { fetchKnowledgeAll } from '@/app/lib/data-knowledge';
import CreateBotForm from '@/app/ui/bot/create-form';
import Breadcrumbs from '@/app/ui/knowledge/breadcrumbs';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Bot',
};
export default async function Page() {

    let [knowledges] = await Promise.all([fetchKnowledgeAll()]);

    if (!knowledges) {
        knowledges = [{}];
    }

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
            <CreateBotForm knowledges={knowledges} />
        </main>
    );
}

