import { UserProfile } from "@/app/lib/model/user-profile-model";
import { axiosAction } from "@/app/lib/api-service";
import { ResponseModel } from "../model/reponse-model";

const URL_API = 'users'

export const createUserProfile = async (data: UserProfile) => {
    try {
        const userProfile: ResponseModel = await axiosAction.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${URL_API}`, data)
        return response(userProfile)
    } catch (error) {
        alert('No se pudo registrar el usuario')
        return 'No se pudo registrar el usuario'
    }
}

const response = (dataResponse: ResponseModel) => {
    const { data, message, statusCode } = dataResponse ?? {}
    return data
}