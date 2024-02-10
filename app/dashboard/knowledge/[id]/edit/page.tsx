import { fetchKnowledgeById } from '@/app/lib/data-knowledge';
import Breadcrumbs from '@/app/ui/knowledge/breadcrumbs';
import EditKnowledgeForm from '@/app/ui/knowledge/edit-form';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Knowledge',
};
export default async function Page({ params }: { params: { id: number } }) {

    const id = params.id;
    const [knowledge] = await Promise.all([fetchKnowledgeById(id)]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Base de Conocimiento', href: '/dashboard/knowledge' },
                    {
                        label: 'Editar',
                        href: `/dashboard/knowledge/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditKnowledgeForm knowledge={knowledge} />
        </main>
    );
}