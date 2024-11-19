export type IHttpMethod = "GET" | "POST" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IServiceResponse<T> {
    data: T | null
    showMessage: () => void
    success: boolean
}