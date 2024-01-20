import { DataDisplayProps } from '@/app/lib/interface';
import { formatDateToLocal } from '@/app/lib/utils';
import React from 'react';
import { lusitana } from '../fonts';

interface DataItemProps {
    data: DataDisplayProps[];
}

const DataDisplayLogs: React.FC<DataItemProps> = React.memo(({ data }) => {
    return (
        <div>
            <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className={`${lusitana.className} min-w-full divide-y divide-gray-200`}>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Texto del Contexto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha de Creación
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateToLocal(item.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default DataDisplayLogs;