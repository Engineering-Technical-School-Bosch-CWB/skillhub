export type IHttpMethod = "GET" | "POST" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IServiceResponse<T> {
    data: T | null
    success: boolean
    statusCode: number
    message: string | undefined
}