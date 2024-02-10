'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    createKnowledgeData,
    deleteKnowledgeBaseData,
    deleteKnowledgeData,
    updateKnowledgeData,
    uploadKnowledgeFileData
} from './data-knowledge';

// Objeto de Validacion
const KnowledgeSchema = z.object({
    name: z.string()
        .min(5, { message: "Debe tener 5 o más caracteres" })
        .max(30, { message: "Debe tener máximo 30 caracteres" })
        .regex(/^[a-zA-Z0-9\s]*$/, { message: 'No se admiten caracteres especiales' }),
});

const CreateKnowledge = KnowledgeSchema;
const UpdateKnowledge = KnowledgeSchema;

export type State = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

export async function createKnowledge(
    member_id: number,
    prevState: State,
    formData: FormData) {
    const validatedFields = CreateKnowledge.safeParse({
        name: formData.get('name'),
    })

    // Valida datos de entrada...
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    // Extrae los campos del Form...
    const { name } = validatedFields.data;
    try {
        const result = await createKnowledgeData(member_id, name);
        console.log('Base de Conocimiento Creada Satisfactoriamente:', result);
    } catch (error) {
        return {
            message: 'Error: Creando la Base de Conocimiento',
        }
    };

    revalidatePath('/dashboard/knowledge')
    redirect('/dashboard/knowledge')
}

export async function updateKnowledge(
    knowledge_id: number,
    member_id: number,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateKnowledge.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Verifique la información Suministrada',
        };
    }

    const { name } = validatedFields.data;
    try {
        const result = await updateKnowledgeData(knowledge_id, name)
        console.log('Base de Conocimiento actualizada Satisfactoriamente:', result);
    } catch (error) {
        return {
            message: 'Error: Fallo la actualización...',
        }
    };

    // Procesamiento de archivos
    const fileUpload = formData.get('fileUpload');
    if (fileUpload instanceof File && fileUpload.size > 0) {
        try {
            await uploadKnowledgeFileData(member_id, knowledge_id, [fileUpload]);
            console.log('Archivo Subido');
        } catch (error) {
            return {
                message: 'Error: Fallo subir el archivo...',
            };
        }
    }

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

export async function deleteKnowledge(id: number) {
    try {
        const result = await deleteKnowledgeData(id)
        console.log('Knowledge delete successfully:', result);
    } catch (error) {
        return {
            message: 'Error: Fallo la eliminación del registro...',
        }
    };

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

export async function deleteKnowledgeBase(id: number) {
    try {
        const result = await deleteKnowledgeBaseData(id)
        console.log('Documento Eliminado Satisfactoriamente:', result);
    } catch (error) {
        return {
            message: 'Error: Eliminado el documento...',
        }
    };

    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}