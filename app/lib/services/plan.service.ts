import { ResponseModel } from "@/app/lib/model/reponse-model";
import { axiosAction } from "../api-service";
import { Plan } from "../model/plan-model";

const URL_API = 'plan'

export const getPlanById = async (id: number) => {
    try {
        const plan: ResponseModel = await axiosAction.get(`${URL_API}/${id}`)
        return response(plan)
    } catch (error) {
        return error;
    }
}

export const getAllPlan= async () => {
    try {
        const plan: ResponseModel = await axiosAction.get(`${URL_API}`)
        return response(plan)
    } catch (error) {
        return error;
    }
}

export const createPlan = async (data: Plan) => {
    try {
        const userProfile: ResponseModel = await axiosAction.post(`${URL_API}`, data)
        return response(userProfile)
    } catch (error) {
        return error;
    }
}

export const updatePlan = async (id: number, body:any) => {
    try {
        const plan: ResponseModel = await axiosAction.patch(`${URL_API}`, id, body)
        return response(plan)
    } catch (error) {
        return error;
    }
}

export const deletePlan = async (id: number) => {
    try {
        const plan: ResponseModel = await axiosAction.deleteItem(`${URL_API}`, id)
        return response(plan)
    } catch (error) {
        return error;
    }
}

const response = (dataResponse: ResponseModel) => {
    const { data, message, statusCode } = dataResponse ?? {}
    return data
}