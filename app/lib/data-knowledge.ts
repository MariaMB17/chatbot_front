import axios, { AxiosResponse } from 'axios';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

interface CreateKnowledgeProps {
    knowledge: {
        name: string;
    };
    member_id: number;
}

interface UpdateKnowledgeProps {
    knowledge: {
        name: string;
    };
}

// Configuración de instancia de axios con la URL base
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Función de manejo de errores
const handleError = (error: any) => {

    if (axios.isAxiosError(error)) {
        console.error('Error en la solicitud:', error.response?.data);
        throw new Error('Mensaje de error para Mostrar');
    } else {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}

export async function fetchFilteredKnowledge(
    query: string,
    currentPage: number
) {
    noStore();

    const url = `/knowledge/filtered/${query}/${currentPage}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function fetchKnowledgePages(query: string): Promise<number> {
    noStore();

    const url = `/knowledge/records/${query}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        const totalPages = Math.ceil(response.data.data / ITEMS_PER_PAGE);
        return totalPages || 0;
    } catch (error) {
        handleError(error);
    }
    return 0;
}

export async function fetchKnowledgeById(id: number) {
    noStore();

    const url = `/knowledge/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function fetchKnowledgeUnique(name: string) {
    noStore();

    const url = `/knowledge/unique/${name}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function createKnowledgeData(
    member_id: number,
    name: string,
) {
    noStore();

    const knowledgeData: CreateKnowledgeProps = {
        knowledge: {
            name
        },
        member_id
    }

    const url = '/knowledge';
    try {
        const response: AxiosResponse = await axiosInstance.post(url, knowledgeData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateKnowledgeData(
    id: number,
    name: string,
) {
    noStore();

    const knowledgeData: UpdateKnowledgeProps = {
        knowledge: {
            name
        }
    }

    const url = `/knowledge/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.patch(url, knowledgeData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteKnowledgeData(id: number) {
    noStore();

    const url = `/knowledge/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteKnowledgeBaseData(id: number) {
    noStore();

    const url = `/knowledge/base/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function uploadKnowledgeFileData(
    member_id: number,
    knowledge_id: number,
    files: File[]) {
    noStore();

    const formData = new FormData();
    formData.append('member_id', member_id.toString());
    formData.append('knowledge_id', knowledge_id.toString());
    files.forEach(file => {
        formData.append('files', file);
    });

    try {
        const url = `knowledge/upload`;
        const response = await axiosInstance.post(url, formData);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getDataTextContex(id: number): Promise<string> {
    noStore();
    try {
        const url = `/knowledge/textcontext/${id}`;
        const response: AxiosResponse = await axiosInstance.get(url)
        return response.data.data || ''
    } catch (error) {
        handleError(error);
    }
    return '';
}


