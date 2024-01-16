import axios from 'axios';
import getConfig from 'next/config';
import { getCookie } from "cookies-next";
import { ResponseModel } from './model/reponse-model';

export const axiosAction = {
    get: (url: string) => Promise<void>,
    post,
    /*put,
    delete: _delete*/
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

const  get = (url:string) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return axios(url, requestOptions).then(handleResponse);

}

function post(url:string, body: any):Promise<ResponseModel>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        data: JSON.stringify(body)
    };
    return axios(url, requestOptions);
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