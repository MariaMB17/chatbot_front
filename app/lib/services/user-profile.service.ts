import { UserProfile } from "@/app/lib/model/user-profile-model";
import { axiosAction } from "@/app/lib/api-service";
import { ResponseModel } from "../model/reponse-model";

const URL_API = 'users'

export const createUserProfile = async (data: UserProfile) => {
    try {
        const userProfile: ResponseModel = await axiosAction.post(`${URL_API}`, data)
        return response(userProfile)
    } catch (error) {
        return error;
    }
}

export const getUserByEmail = async(email: string)=>{
    try {
        const userProfile: any = await axiosAction.get(`${URL_API}/email/${email}`)
        return response(userProfile)        
    } catch (error) {
        return error;        
    }
}

const response = (dataResponse: ResponseModel) => {
    const { data, message, statusCode } = dataResponse ?? {}
    return data
}