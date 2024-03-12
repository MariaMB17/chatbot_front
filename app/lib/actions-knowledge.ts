'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    createKnowledgeData,
    deleteKnowledgeBaseData,
    deleteKnowledgeData,
    fetchKnowledgeUnique,
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
    errors?: { name?: string[] };
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
    const response = await fetchKnowledgeUnique(name);
    if (response) {
        return {
            message: 'Nombre se encuentra en Uso',
        }
    }

    // Crear registro
    const result = await createKnowledgeData(member_id, name);
    if (!result) {
        return {
            message: 'Error: Creando el Nombre',
        }
    }
    else {
        console.log('Conocimiento Creado Satisfactoriamente');
        revalidatePath('/dashboard/knowledge')
        redirect(`/dashboard/knowledge/${result.data.id}/edit`);
    }
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
            const result = await uploadKnowledgeFileData(member_id, knowledge_id, [fileUpload]);
            if (result) {
                console.log('Documento Subido Satisfactoriamente');
            }
        } catch (error) {
            return {
                message: 'Error: Fallo subir el documento...',
            };
        }
    }

    try {
        const result = await updateKnowledgeData(knowledge_id, name);
        if (result) {
            console.log('Conocimiento actualizado Satisfactoriamente:');
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la actualización...',
        }
    };
    revalidatePath('/dashboard/knowledge');
    redirect('/dashboard/knowledge');
}

export async function deleteKnowledge(id: number) {
    try {
        await deleteKnowledgeData(id)
        console.log('Registro Eliminado');
        revalidatePath('/dashboard/knowledge');
        return {
            message: 'Registro Eliminado...',
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la eliminación del registro...',
        }
    };
}

export async function deleteKnowledgeBase(id: number) {
    try {
        await deleteKnowledgeBaseData(id)
        console.log('Documento Eliminado Satisfactoriamente');
        revalidatePath(`/dashboard/knowledge/${id}/edit`);
        return {
            message: 'Registro Eliminado',
        }
    } catch (error) {
        return {
            message: 'Error: Fallo la eliminación del documento...',
        }
    };
}

