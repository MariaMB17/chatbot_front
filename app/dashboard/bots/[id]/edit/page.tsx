import { fetchBotById } from '@/app/lib/data-bot';
import { fetchKnowledgeAll } from '@/app/lib/data-knowledge';
import EditBotForm from '@/app/ui/bot/edit-forms';
import Breadcrumbs from '@/app/ui/knowledge/breadcrumbs';
import { Metadata } from "next";
import { notFound } from 'next/navigation';

interface KnowledgeProps {
    id: number;
    name: string;
}

export const metadata: Metadata = {
    title: 'Edit Bot',
};
export default async function Page({ params }: { params: { id: number } }) {

    const id = params.id;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
        notFound();
    }

    let [bot, knowledge] = await Promise.all([fetchBotById(id), fetchKnowledgeAll()]);

    if (!bot) {
        notFound();
    }

    if (!knowledge) {
        knowledge = [{}];
    }

    let knowledgeOnBot: KnowledgeProps[] = [];
    if (bot.knowledgeOnBot.length > 0) {
        const knowledgeObjects: KnowledgeProps[] = bot.knowledgeOnBot.map((item: { knowledge: KnowledgeProps; }) => item.knowledge);

        knowledgeOnBot = knowledgeObjects.map(knowledge => ({
            id: knowledge.id,
            name: knowledge.name
        }));
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Base de Conocimiento', href: '/dashboard/bots' },
                    {
                        label: 'Editar',
                        href: `/dashboard/bots/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditBotForm bots={bot} knowledges={knowledge} knowledgeOnBots={knowledgeOnBot} />
        </main>
    );
}