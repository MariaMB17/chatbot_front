'use client';

import { updateKnowledge } from '@/app/lib/actions-knowledge';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function EditKnowledgeForm({
  knowledge,
}: {
  knowledge: KnowledgeProps;
}) {
  const initialState = { message: null, errors: {} };
  const updateKnoledgeWithId = updateKnowledge.bind(null, knowledge.id);
  const [state, dispatch] = useFormState(updateKnoledgeWithId, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    validateFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    validateFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const validateFile = (file: File | null) => {
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      } else {
        // Clear selected file if it's not PDF or DOCX
        setSelectedFile(null);
        toast.error('El archivo debe ser de tipo PDF o DOCX', {
          style: {
            backgroundColor: '#FECACA',
            color: '#B91C1C',
          }
        });
      }
    }
  };

  const renderFileSize = (size: number) => {
    const KB = size / 1024;
    if (KB < 1024) {
      return `${KB.toFixed(2)} KB`;
    } else {
      const MB = KB / 1024;
      return `${MB.toFixed(2)} MB`;
    }
  };

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
                  type="text"
                  defaultValue={knowledge.name}
                  placeholder="description"
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

          {/* File input field */}
          <div className="mb-4">
            <label htmlFor="file" className="mb-2 block text-sm font-medium">
              Upload File (.pdf or .docx)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              onDrop={handleDrop}
              onDragOver={handleDragOver}>
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="fileUpload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF or DOCX up to 10MB</p>
              </div>
            </div>
          </div>

          {/* File details table */}
          {selectedFile && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Selected File Details</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      Name
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-full">
                        {selectedFile.name}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      Type
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {selectedFile.type === 'application/pdf' ? 'Pdf' : 'Word'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      Size
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderFileSize(selectedFile.size)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
      <KnowledgeFileTable knowledges={knowledge} />
    </div>
  );
}
