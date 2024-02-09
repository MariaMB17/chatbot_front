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

export default function KnowledgeFileTable(
    { knowledges, }: { knowledges: KnowledgeProps }) {

    const knowledgeBaseItems = knowledges.knowledgeBase;

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {knowledgeBaseItems.map((knowledgeBase) => (
                            <div key={knowledgeBase.id} className="mb-2 w-full rounded-md bg-white p-4">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2">
                                            <p className="text-sm md:text-base">{knowledgeBase.originalname}</p> {/* Mostrar el nombre completo */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>{formatDateToLocal(knowledgeBase.createdAt)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
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
                                </div>
                            </div>
                        ))}
                    </div>

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            {/* Cabecera de la tabla */}
                        </thead>
                        <tbody className="bg-white">
                            {knowledgeBaseItems.map((knowledgeBase) => (
                                <tr
                                    key={knowledgeBase.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-normal py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm md:text-base">{knowledgeBase.originalname}</p> {/* Mostrar el nombre completo */}
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(knowledgeBase.createdAt)}</td>

                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
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
            </div>
        </div>
    );
}