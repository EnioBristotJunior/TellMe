import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [userIsLogged, setUserIsLogged] = useState(false)

    return (
        <AuthContext.Provider value={{userIsLogged, setUserIsLogged}}>
            {children}
        </AuthContext.Provider>
    )
}