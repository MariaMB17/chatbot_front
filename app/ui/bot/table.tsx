import { fetchFilteredBot } from '@/app/lib/data-bot';
import { formatDateToLocal } from '@/app/lib/utils';
import { DeleteBot, UpdateBot } from './buttons';

interface BotProps {
  id: number;
  name: string;
  createdAt: string,
  updatedAt: string,
  nickname: string
}
export default async function BotTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const bots = await fetchFilteredBot(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {bots?.map((bot: BotProps) => (
              <div
                key={bot.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2">
                      <p className="text-sm md:text-base overflow-y-auto" style={{ maxHeight: '3rem' }}>{bot.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xl font-medium">
                    {bot.nickname}
                  </p>
                  <div>
                    <p>{formatDateToLocal(bot.createdAt)}</p>
                  </div>
                  <div>
                    <p>{formatDateToLocal(bot.updatedAt)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateBot id={bot.id} />
                    <DeleteBot id={bot.id} />
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
                  Nickname
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
              {bots?.map((bot: BotProps) => (
                <tr
                  key={bot.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p className="text-sm md:text-base overflow-y-auto" style={{ maxHeight: '3rem' }}>{bot.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {bot.nickname}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(bot.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(bot.updatedAt)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateBot id={bot.id} />
                      <DeleteBot id={bot.id} />
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