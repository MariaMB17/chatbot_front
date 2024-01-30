'use client';

import { fetchTextContext } from '@/app/lib/api-log';
import { DataDisplayProps } from '@/app/lib/interface';
import { lusitana } from '@/app/ui/fonts';
import DataDisplayLogs from '@/app/ui/logs/datadisplay';
import { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState<Array<DataDisplayProps> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchTextContext() as Array<DataDisplayProps>;;
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Información de la API
            </h1>
            {data && <DataDisplayLogs data={data} />}
        </div>
    );
};


export default Home;
