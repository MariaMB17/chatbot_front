import { formatDateToLocal } from '@/app/lib/utils';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { DeleteKnowledgeBase } from './buttons';

interface KnowledgeFileProps {
    id: number;
    asset_id: string;
    public_id: string;
    secure_url: string;
    knowledgeBase_id: number;
}

interface KnowledgeBaseProps {
    id: number;
    originalname: string;
    mimetype: string;
    textContent: string;
    createdAt: string;
    knowledge_id: number;
    knowledgeFile: KnowledgeFileProps[];
}

interface KnowledgeProps {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    knowledgeBase: KnowledgeBaseProps[];
}

export default function KnowledgeFileTable({ knowledges }: { knowledges: KnowledgeProps }) {
    const knowledgeBaseItems = knowledges.knowledgeBase;

    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha de Creación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {knowledgeBaseItems.map((knowledgeBase) => (
                        <tr key={knowledgeBase.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{knowledgeBase.originalname}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatDateToLocal(knowledgeBase.createdAt)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={knowledgeBase.knowledgeFile?.find((file) => file.knowledgeBase_id === knowledgeBase.id)?.secure_url}
                                        download={knowledgeBase.originalname}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-md border p-2 hover:bg-gray-100 flex items-center gap-1"
                                    >
                                        <ArrowDownTrayIcon className="w-5" />
                                    </a>
                                    <DeleteKnowledgeBase id={knowledgeBase.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
