import { createContext, ReactNode, useContext, useState } from "react"
import IUser from "../interfaces/models/IUser"

interface IUserContext {
    user: IUser | null
    setUser: (user: IUser | null) => void
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
                setUser: handleSetUser
            }}
            children={children}
        />
    );
};

const useUserContext = () => {
    const { user, setUser } = useContext(UserContext);

    const isAdmin = user?.position?.positionLevel! > 1 && user?.sector?.name === "ETS"

    return { user, setUser, isAdmin };
}

export { useUserContext, UserProvider };