import { AccessLevel } from "../../enums/AccessLevel"

export interface IUser {
    name: string
    identification: string
    birthday: string
    accessLevel?: AccessLevel
}

export interface ILoginPayload {
    identification: string
    password: string
}

export interface IResult {
    subject: string;
    exploitation: number;
  }