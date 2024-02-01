'use client';

import { updateKnowledge } from '@/app/lib/actions-knowledge';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import KnowledgeFileTable from './table-file';

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

export default function EditKnowledgeForm(
  { knowledge }: { knowledge: KnowledgeProps }) {

  const initialState = { message: null, errors: {} };
  const updateKnoledgeWithId = updateKnowledge.bind(null, knowledge.id);
  const [state, dispatch] = useFormState(updateKnoledgeWithId, initialState);

  return (
    <div>
      <form action={dispatch}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name Knowledge
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="string"
                  defaultValue={knowledge.name}
                  placeholder="descripcion"
                  aria-describedby="name-error"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <FolderPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state.message ? (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              ) : null}
            </div>
          </div>

        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/knowledge"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Knowledge</Button>
        </div>
        <KnowledgeFileTable knowledges={knowledge} />
      </form>
    </div>
  );
}
