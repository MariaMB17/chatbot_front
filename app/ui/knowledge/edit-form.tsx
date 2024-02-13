'use client';

import { updateKnowledge } from '@/app/lib/actions-knowledge';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const member_id = 1;
  const initialState = { message: null, errors: {}, success: false };
  const updateKnoledgeWithId = updateKnowledge.bind(null, knowledge.id, member_id);
  const [state, dispatch] = useFormState(updateKnoledgeWithId, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mensajes del Form Action
  useEffect(() => {
    if (state.errors?.name) {
      state.errors?.name && state.errors.name.map((message: string) => {
        handleErrorsToast(message)
      })
    };
    if (state.message) {
      handleErrorsToast(state.message, state.success)
    }
    if (state.success) {
      resetFileSelection();
    }
  }, [state])

  const handleErrorsToast = (
    message: string,
    success: boolean = false) => {

    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          backgroundColor: '#FECACA',
          color: '#B91C1C',
        },
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    validateFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      validateFile(file);
    }
  };

  const validateFile = (file: File | null) => {
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/pdf' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        handleErrorsToast('Tipo de Documento: (PDF o DOCX)');
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

  const resetFileSelection = () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    fileInput.value = ''; // Reset file input
    setSelectedFile(null);
  };

  return (
    <div>
      <form action={dispatch}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nombre:
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={knowledge.name}
                  placeholder="Base de Conocimiento"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <FolderPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* File input field */}
          <div className="mb-4 overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <label htmlFor="fileUpload" className="mb-2 block text-sm font-medium">
              Subir Documento (.pdf o .docx):
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="fileUpload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Subir un Documento</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">o puede arrastrar y soltar</p>
                </div>
                <p className="text-xs text-gray-500">el archivo PDF ó WORD, tamaño máximo de 10MB</p>
              </div>
            </div>
          </div>

          {/* File details table */}
          {selectedFile && (
            <div className="mb-4 overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <h3 className="text-sm font-medium mb-2">Documento Seleccionado:</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      Nombre:
                    </td>

                    <td className="whitespace-normal py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p className="text-sm md:text-base overflow-y-auto" style={{ maxHeight: '3rem' }}>{selectedFile.name}</p>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="max-w-full">
                        {selectedFile.name}
                      </div>
                    </td> */}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      Documento:
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {selectedFile.type === 'application/pdf' ? 'PDF' : 'WORD'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      Tamaño:
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {renderFileSize(selectedFile.size)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Button onClick={resetFileSelection} className="mt-4">
                Quitar
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/knowledge"
            className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Cancelar
          </Link>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
      <KnowledgeFileTable knowledges={knowledge} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}