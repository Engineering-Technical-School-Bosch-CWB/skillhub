import { createContext, ReactNode, useState } from "react"
import { IUser } from "../interfaces/users.interfaces";

interface IUserContext {
    user: IUser | null
    handleSetUser: (user: IUser | null) => void
} 

const UserContext = createContext({} as IUserContext)

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<IUser | null>(null)

    const handleSetUser = (user: IUser | null) => {
        setUser(user)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                handleSetUser
            }}
            children={children}
        />
    );
};

export { UserContext, UserProvider };