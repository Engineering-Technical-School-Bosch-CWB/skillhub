export type IHttpMethod = "GET" | "POST" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IPaginationInfo {
    items: number,
    currentPage: number
    totalPages: number
}

export interface IServiceResponse<T> {
    data: T | null
    success: boolean
    statusCode: number
    message: string | undefined
    info?: IPaginationInfo
    errors?: any
}