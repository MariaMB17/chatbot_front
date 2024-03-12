'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    createBotData,
    deleteBotData,
    fetchBotUnique,
    updateBotData
} from './data-bot';

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
    idsKnowledge: z.string()
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
        idsKnowledge: formData.get('idsKnowledge')
    })

    // Valida datos de entrada...
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    // Extrae los campos del Form...
    const {
        name,
        nickname,
        description,
        personality,
        modelgpt,
        idsKnowledge
    } = validatedFields.data;

    const response = await fetchBotUnique(name);
    if (response) {
        return {
            message: 'Nombre del bot se encuentra en Uso',
        }
    }

    // Verifica si Seleccionaron algun Coconocimiento(knowledge)
    let knowledgeids: number[] = [];
    const ids = idsKnowledge.replace(/"/g, '');
    if (ids.trim().length > 0) {
        knowledgeids = ids.split(',').map(Number);
    }

    const botData = {
        name,
        nickname,
        description,
        personality,
        modelgpt
    };

    try {
        const result = await createBotData(botData, member_id, knowledgeids);
        if (result) {
            console.log('Bot Creado Satisfactoriamente');
        }
    } catch (error) {
        let errorMsg = 'Algo salio mal'
        if (error instanceof Error) {
            errorMsg = `Error: ${error.message}`
        }
        return { message: errorMsg }
    }
    revalidatePath('/dashboard/bots');
    redirect('/dashboard/bots');
}

export async function updateBot(
    bot_id: number,
    member_id: number,
    prevState: State,
    formData: FormData
) {

    const validatedFields = UpdateBot.safeParse({
        name: formData.get('name'),
        nickname: formData.get('nickname'),
        description: formData.get('description'),
        modelgpt: formData.get('modelgpt'),
        personality: formData.get('personality'),
        idsKnowledge: formData.get('idsKnowledge')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    const {
        name,
        nickname,
        description,
        personality,
        modelgpt,
        idsKnowledge
    } = validatedFields.data;

    // Busca el nombre para verificar si existe
    try {
        const response = await fetchBotUnique(name)
        if (response && response.id !== bot_id) {
            return {
                message: 'Este nombre se encuentra en uso',
            }
        }
    } catch (error) {
        return {
            message: 'Error: Consultando nombre Unico',
        };
    }

    // Verifica si Seleccionaron algun Coconocimiento(knowledge)
    let knowledgeids: number[] = [];
    const ids = idsKnowledge.replace(/"/g, '');
    if (ids.trim().length > 0) {
        knowledgeids = ids.split(',').map(Number);
    }

    const botData = {
        name,
        nickname,
        description,
        personality,
        modelgpt
    };

    try {
        const result = await updateBotData(bot_id, botData, member_id, knowledgeids);
        if (result) {
            console.log('Bot actualizado Satisfactoriamente:', result.data);
        }

    } catch (error) {
        let errorMsg = 'Algo salio mal'
        if (error instanceof Error) {
            errorMsg = `Error: ${error.message}`
        }
        return { message: errorMsg }
    }

    revalidatePath('/dashboard/bots');
    redirect('/dashboard/bots');
}

export async function deleteBot(id: number) {
    try {
        const result = await deleteBotData(id)
        if (result) {
            console.log('Registro Eliminado');
        }
    } catch (error) {
        let errorMsg = 'Algo salio mal'
        if (error instanceof Error) {
            errorMsg = `Error: ${error.message}`
        }
        return { message: errorMsg }
    }
    revalidatePath('/dashboard/bots');
    redirect('/dashboard/bots');
}