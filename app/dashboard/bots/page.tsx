import { fetchBotPages } from '@/app/lib/data-bot';
import { CreateBot } from '@/app/ui/bot/buttons';
import Pagination from '@/app/ui/bot/pagination';
import Search from '@/app/ui/bot/search';
import BotTable from '@/app/ui/bot/table';
import { lusitana } from '@/app/ui/fonts';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bot',
};

export default async function BotPage({
    searchParams
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {

    const currentPage = Number(searchParams?.page) || 1
    const query = searchParams?.query || '_';
    const totalPages = await fetchBotPages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Bot</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar..." />
                <CreateBot />
            </div>

            <BotTable query={query} currentPage={currentPage} />

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}