import { createContext, ReactNode, useState } from "react"

interface IUserContext {
    name: string,
    setName: (value: string) => void,
    identification: string,
    setIdentification: (value: string) => void,
    card: string,
    setCard: (value: string) => void,
    birthday: string,
    setBirthday: (value: string) => void,
} 

const UserContext = createContext({} as IUserContext)

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("")
    const [identification, setIdentification] = useState("")
    const [card, setCard] = useState("")
    const [birthday, setBirthday] = useState("")

    const handleSetName = (value: string) => {
        setName(value);
    };

    const handleSetIdentification = (value: string) => {
        setIdentification(value);
    };

    const handleSetCard = (value: string) => {
        setCard(value);
    };

    const handleSetBirthday = (value: string) => {
        setBirthday(value);
    };

    return (
        <UserContext.Provider
            value={{
                name, setName: handleSetName,
                identification, setIdentification: handleSetIdentification,
                card, setCard: handleSetCard,
                birthday, setBirthday: handleSetBirthday
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };