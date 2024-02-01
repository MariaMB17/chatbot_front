import { fetchFilteredKnowledge } from '@/app/lib/data-knowledge';
import { formatDateToLocal } from '@/app/lib/utils';
import { DeleteKnowledge, UpdateKnowledge } from './buttons';

interface KnowledgeProps {
  id: number;
  name: string;
  createdAt: string,
  updatedAt: string,
  documents: string
}
export default async function KnowledgeTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const knowledges = await fetchFilteredKnowledge(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {knowledges?.map((knowledge: KnowledgeProps) => (
              <div
                key={knowledge.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{knowledge.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xl font-medium">
                    {knowledge.documents}
                  </p>
                  <div>
                    <p>{formatDateToLocal(knowledge.createdAt)}</p>
                  </div>
                  <div>
                    <p>{formatDateToLocal(knowledge.updatedAt)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateKnowledge id={knowledge.id} />
                    <DeleteKnowledge id={knowledge.id} />
                  </div>
                </div>
              </div>
            ))}

          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Documentos
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actualizado
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-right">
                  Acciones
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {knowledges?.map((knowledge: KnowledgeProps) => (
                <tr
                  key={knowledge.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{knowledge.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {knowledge.documents}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(knowledge.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(knowledge.updatedAt)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateKnowledge id={knowledge.id} />
                      <DeleteKnowledge id={knowledge.id} />
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
