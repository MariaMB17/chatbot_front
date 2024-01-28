import { Company } from "@/app/lib/model/company-model";
import { ResponseModel } from "@/app/lib/model/reponse-model";
import { axiosAction } from "../api-service";

const URL_API = 'companies'

export const updateCompnay = async (id: string, data: any) => {
    try {
        const company: ResponseModel = await axiosAction.patch(`${URL_API}`, id, data)
        return response(company)
    } catch (error) {
        return error;
    }
}

const response = (dataResponse: ResponseModel) => {
    const { data, message, statusCode } = dataResponse ?? {}
    return data
}