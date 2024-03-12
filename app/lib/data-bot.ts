import axios, { AxiosResponse } from 'axios';
import { unstable_noStore as noStore } from 'next/cache';

interface BotProps {
    bot: {};
    knowledgeIds: number[];
    member_id: number;
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

const ITEMS_PER_PAGE = 6;
export async function fetchBotPages(query: string): Promise<number> {
    noStore();

    const url = `/bots/records/${query}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        const totalPages = Math.ceil(response.data.data / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        handleError(error);
        return 0;
    }

}

export async function fetchFilteredBot(
    query: string,
    currentPage: number
) {
    noStore();

    const url = `/bots/filtered/${query}/${currentPage}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function fetchBotUnique(name: string) {
    noStore();

    const url = `/bots/unique/${name}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function fetchBotById(id: number) {
    noStore();
    const url = `/bots/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function createBotData(
    getBotData: {},
    member_id: number,
    knowledgeIds: number[],
) {
    noStore();

    const botData: BotProps = {
        bot: getBotData,
        member_id,
        knowledgeIds
    }

    const url = '/bots';
    try {
        const response: AxiosResponse = await axiosInstance.post(url, botData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateBotData(
    id: number,
    getBotData: {},
    member_id: number,
    knowledgeIds: number[],
) {
    noStore();

    const botData: BotProps = {
        bot: getBotData,
        member_id,
        knowledgeIds
    }
    const url = `/bots/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.patch(url, botData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteBotData(id: number) {
    noStore();

    const url = `/bots/${id}`;
    try {
        const response: AxiosResponse = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}