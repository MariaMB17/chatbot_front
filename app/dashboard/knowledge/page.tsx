import { fetchKnowledgePages } from '@/app/lib/data-knowledge';
import { lusitana } from '@/app/ui/fonts';
import { CreateKnowledge } from '@/app/ui/knowledge/buttons';
import Pagination from '@/app/ui/knowledge/pagination';
import Search from '@/app/ui/knowledge/search';
import KnowledgeTable from '@/app/ui/knowledge/table';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Knowledge',
};

export default async function KnowledgePage({
    searchParams
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {

    const currentPage = Number(searchParams?.page) || 1
    const query = searchParams?.query || '_';
    const totalPages = await fetchKnowledgePages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Base de Conocimiento</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar..." />
                <CreateKnowledge />
            </div>

            <KnowledgeTable query={query} currentPage={currentPage} />

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}