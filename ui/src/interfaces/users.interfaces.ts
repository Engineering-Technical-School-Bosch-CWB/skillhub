export interface IUser {
    name: string
    identification: string
    birthday: string
}

export interface ILoginPayload {
    identification: string
    password: string
}