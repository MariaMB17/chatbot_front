import Breadcrumbs from '@/app/ui/knowledge/breadcrumbs';
import CreateKnowledgeForm from '@/app/ui/knowledge/create-form';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Knowledge',
};
export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Base de Conocimiento', href: '/dashboard/knowledge' },
                    {
                        label: 'Agregar',
                        href: '/dashboard/knowledge/create',
                        active: true,
                    },
                ]}
            />
            <CreateKnowledgeForm />
        </main>
    );
}