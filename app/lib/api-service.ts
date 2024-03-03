import axios from 'axios';
import getConfig from 'next/config';
import { getCookie } from "cookies-next";
import { ResponseModel } from './model/reponse-model';

export const axiosAction = {
    get,
    post,
    patch,
    /*delete: _delete*/
};

const authHeader = (url:string) => {
    const token = getCookie('token') ?? null;
    const isApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function  get(url:string):Promise<ResponseModel>{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    };
    return axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, requestOptions);

}

function post(url:string, body: any):Promise<ResponseModel>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        data: JSON.stringify(body)
    };
    return axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, requestOptions);
}

function patch(url: string, id: string, body: any): Promise<ResponseModel> {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader(url) },
      data: JSON.stringify(body)
    };
    return axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}/${id}`, requestOptions);
  }

const handleResponse = (response: any) => {
    console.log(response)
    /*return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });*/
}