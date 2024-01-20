import axios from 'axios';
import { DataDisplayProps } from './interface';

interface KnowledgeResponse {
    data: DataDisplayProps[];
}

export const fetchTextContext = async (): Promise<DataDisplayProps[]> => {
    try {
        const response = await axios.get<KnowledgeResponse>(`http://localhost:3001/knowledge`);
        return response.data.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};