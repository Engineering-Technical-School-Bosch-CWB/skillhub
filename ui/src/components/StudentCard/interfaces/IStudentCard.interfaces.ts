import IUser from "../../../interfaces/models/IUser";

export interface IStudentCardProps {
    student?: IUser,
    className?: string, 
    tooltip?: string, 
    size?: string,
    goTo?: string
}