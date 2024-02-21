'use server'

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createBotData, fetchBotUnique } from './data-bot';
import {
    deleteKnowledgeBaseData,
    deleteKnowledgeData,
    fetchKnowledgeUnique,
    updateKnowledgeData,
    uploadKnowledgeFileData
} from './data-knowledge';

// Objeto de Validacion
const BotSchema = z.object({
    name: z.string()
        .min(5, { message: "El nombre debe tener 5 o más caracteres" }),
    nickname: z.string()
        .min(5, { message: "El alias debe tener 5 o más caracteres" }),
    description: z.string()
        .min(5, { message: "La descripción debe tener 5 o más caracteres" }),
    modelgpt: z.enum(['free', 'basic', 'premium'], {
        invalid_type_error: 'Debe especificar un modelo de GPT',
    }),
    personality: z.string({ invalid_type_error: 'Debe seleccionar el propósito del bot' }),

});

const CreateBot = BotSchema;
const UpdateBot = BotSchema;

export type State = {
    errors?: {
        name?: string[];
        nickname?: string[];
        description?: string[];
        modelgpt?: string[];
        personality?: string[];
    };
    message?: string | null;
    success?: boolean | false;
};

export async function createBot(
    member_id: number,
    prevState: State,
    formData: FormData) {

    const validatedFields = CreateBot.safeParse({
        name: formData.get('name'),
        nickname: formData.get('nickname'),
        description: formData.get('description'),
        modelgpt: formData.get('modelgpt'),
        personality: formData.get('personality'),

    })

    // Valida datos de entrada...
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    // Extrae los campos del Form...
    const { name, nickname, description, personality, modelgpt } = validatedFields.data;
    const response = await fetchBotUnique(name);
    if (response) {
        return {
            message: 'Nombre del bot se encuentra en Uso',
        }
    }

    const botData = {
        name,
        nickname,
        description,
        personality,
        modelgpt
    };

    // Crear registro
    const knowledgeIds = [1]
    const result = await createBotData(botData, member_id, knowledgeIds);
    if (!result) {
        return {
            message: 'Error: Creando el Bot',
        }
    }
    else {
        console.log('Bot Creado Satisfactoriamente');
        revalidatePath('/dashboard/bots')
        return {
            message: 'Bot Creado Satisfactoriamente',
            success: true
        }
    }
}

export async function updateBot(
    knowledge_id: number,
    member_id: number,
    prevState: State,
    formData: FormData
) {

    const validatedFields = UpdateBot.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    const { name } = validatedFields.data;

    // Busca el nombre para verificar si existe
    try {
        const response = await fetchKnowledgeUnique(name)
        if (response && response.id !== knowledge_id) {
            return {
                message: 'Este nombre se encuentra en uso',
            }
        }
    } catch (error) {
        return {
            message: 'Error: Consultando nombre Unico',
        };
    }

    // subida de documentos
    const fileUpload = formData.get('fileUpload');
    if (fileUpload instanceof File && fileUpload.size > 0) {
        try {
            await uploadKnowledgeFileData(member_id, knowledge_id, [fileUpload]);
            console.log('Documento Subido Satisfactoriamente');
        } catch (error) {
            return {
                message: 'Error: Fallo subir el documento...',
            };
        }
    }

    try {
        await updateKnowledgeData(knowledge_id, name);
        console.log('Conocimiento actualizado Satisfactoriamente:');
        revalidatePath(`/dashboard/knowledge/${knowledge_id}/edit`);
        return {
            message: 'Registro Actualizado',
            success: true
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la actualización...',
        }
    };
}

export async function deleteBot(id: number) {
    try {
        await deleteKnowledgeData(id)
        console.log('Registro Eliminado');
        revalidatePath('/dashboard/knowledge');
        return {
            message: 'Registro Eliminado...',
            success: true
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la eliminación del registro...',
        }
    };
}

export async function deleteBotBase(id: number) {
    try {
        await deleteKnowledgeBaseData(id)
        console.log('Documento Eliminado Satisfactoriamente');
        revalidatePath(`/dashboard/knowledge/${id}/edit`);
        return {
            message: 'Registro Eliminado',
            success: true
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la eliminación del documento...',
        }
    };
}

