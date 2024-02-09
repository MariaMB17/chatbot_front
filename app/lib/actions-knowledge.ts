'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    createKnowledgeData,
    deleteKnowledgeBaseData,
    deleteKnowledgeData,
    updateKnowledgeData
} from './data-knowledge';

// Objeto de Validacion
const KnowledgeSchema = z.object({
    name: z.string()
        .min(5, { message: "Debe tener 5 o más caracteres" })
        .regex(/^[a-zA-Z0-9\s]*$/, { message: 'No se admiten caracteres especiales' }),
});

const CreateKnowledge = KnowledgeSchema
const UpdateKnowledge = KnowledgeSchema

export type State = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

interface KnowledgeCreateDataProps {
    knowledge: {
        name: string;
    };
    member_id: number;
}

export async function createKnowledge(
    member_id: number,
    prevState: State,
    formData: FormData) {
    const validatedFields = CreateKnowledge.safeParse({
        name: formData.get('name'),
    })

    console.log(member_id);

    // Valida datos de entrada...
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'No se puedo crear el nombre de Knowledge',
        };
    }

    // Extrae los campos del Form...
    const { name } = validatedFields.data;

    const objectData: KnowledgeCreateDataProps = {
        knowledge: {
            name,
        },
        member_id,
    };

    try {
        const result = await createKnowledgeData(objectData);
        console.log('Knowledge create successfully:', result);
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Knowledge.',
        }
    };

    revalidatePath('/dashboard/knowledge')
    redirect('/dashboard/knowledge')
}

interface KnowledgeUpdateDataProps {
    knowledge: {
        name: string;
    };
}

export async function updateKnowledge(
    id: number,
    prevState: State,
    formData: FormData) {

    console.log(formData);

    const validatedFields = UpdateKnowledge.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'No se pudo actualizado el nombre de Knowledge',
        };
    }

    const { name } = validatedFields.data;

    const objectData: KnowledgeUpdateDataProps = {
        knowledge: {
            name,
        }
    };

    try {
        const result = await updateKnowledgeData(id, objectData)
        console.log('Knowledge updated successfully:', result);
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Knowledge.',
        }
    };

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

export async function deleteKnowledge(id: number) {
    try {
        const result = await deleteKnowledgeData(id)
        console.log('Knowledge delete successfully:', result);
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Knowledge.',
        }
    };

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

export async function deleteKnowledgeBase(id: number) {
    try {
        const result = await deleteKnowledgeBaseData(id)
        console.log('Knowledge document delete successfully:', result);
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Knowledge Document.',
        }
    };

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

