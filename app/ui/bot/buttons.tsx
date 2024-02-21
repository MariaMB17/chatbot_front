import { deleteBot, deleteBotBase } from '@/app/lib/actions-bot';
import {
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateBot() {
  return (
    <Link
      href="/dashboard/bots/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Agregar</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBot({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/bots/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBot({ id }: { id: number }) {
  const deleteBotWithId = deleteBot.bind(null, id);

  return (
    <form action={deleteBotWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteBotBase({ id }: { id: number }) {
  const deleteBotWithId = deleteBotBase.bind(null, id);

  return (
    <form action={deleteBotWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}