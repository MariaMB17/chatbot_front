import { ResponseModel } from "@/app/lib/model/reponse-model";
import { axiosAction } from "../api-service";

const URL_API = 'plan'

export const getPlanById = async (id: number) => {
    try {
        const plan: ResponseModel = await axiosAction.get(`${URL_API}/${id}`)
        return response(plan)
    } catch (error) {
        return error;
    }
}

const response = (dataResponse: ResponseModel) => {
    const { data, message, statusCode } = dataResponse ?? {}
    return data
}