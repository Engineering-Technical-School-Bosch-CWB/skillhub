import { toast } from "react-toastify";
import { IHttpMethod, IServiceResponse } from "../interfaces/services.interfaces";

export default class Service {

    public baseUrl: string
    public contentType: string
    public getAuth: () => string

    public constructor(
        baseUrl: string,
        contentType?: string,
        getAuth?: () => string,
    ) {
        this.baseUrl = baseUrl
        this.contentType = contentType || "application/json"
        this.getAuth = getAuth || (() => {
            const token = sessionStorage.getItem("@AUTH");
            return "Bearer " + token;
        })
    }

    public async jsonRequest<T = any>(
        url: string,
        method: IHttpMethod,
        headers?: HeadersInit,
        body?: any,
    ): Promise<IServiceResponse<T>> {

        const response = await fetch(this.baseUrl + url, {
            method,
            body: body && JSON.stringify(body),
            headers: {
                "Content-Type": this.contentType,
                "Authorization": this.getAuth(),
                ...headers
            }
        })

        const json = await response.json().catch(() => ({}));

        console.log(response);
        console.log(json);

        return {
            statusCode: response.status,
            data: json.data || null,
            success: response.status < 400,
            message: json.message || null,
            info: json.info || null
        }
    }

    public async fileRequest<T = any>(
        url: string,
        method: IHttpMethod,
        body?: any,
        headers?: HeadersInit
    ){ 
        const response = await fetch(this.baseUrl + url, {
            method,
            body,
            headers: {
                "Authorization": this.getAuth(),
                ...headers
            }
        })

        const json = await response.json().catch(() => ({}));

        return {
            statusCode: response.status,
            data: json.data || null,
            success: response.status < 400,
            message: json.message || null,
            info: json.info || null
        }
    }

    public async get<T = any>(url: string, headers?: HeadersInit) {
        return await this.jsonRequest<T>(url, "GET", headers)
    }

    public async post<T = any>(url: string, body?: any, headers?: HeadersInit) {
        return await this.jsonRequest<T>(url, "POST", headers, body);
    }

    public async patch<T = any>(url: string, body?: any, headers?: HeadersInit) {
        return await this.jsonRequest<T>(url, "PATCH", headers, body);
    }

    public async put<T = any>(url: string, body?: any, headers?: HeadersInit) {
        return await this.jsonRequest<T>(url, "PUT", headers, body);
    }

    public async delete<T = any>(url: string, headers?: HeadersInit) {
        return await this.jsonRequest<T>(url, "DELETE", headers);
    }
}
