import { createContext, ReactNode, useContext, useState } from "react"
import IUser from "../interfaces/models/IUser"
import { EPositionLevel } from "@/interfaces/models/IPosition"

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
    console.log(user);
    
    const isAdmin =  (user?.position?.positionLevel!.toString() == "Admin") && user?.sector?.name == "ETS"
    
    console.log(user?.position?.positionLevel!.toString() == EPositionLevel.Admin.toString());
    
    return { user, setUser, isAdmin };
}

export { useUserContext, UserProvider };