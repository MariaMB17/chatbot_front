import { fetchKnowledgePages } from '@/app/lib/data-knowledge';
import { lusitana } from '@/app/ui/fonts';
import { CreateKnowledge } from '@/app/ui/knowledge/buttons';
import Pagination from '@/app/ui/knowledge/pagination';
import Search from '@/app/ui/knowledge/search';
import Table from '@/app/ui/knowledge/table';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

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

            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}