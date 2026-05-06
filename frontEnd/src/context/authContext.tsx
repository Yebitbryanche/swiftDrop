import { createContext, useState, useEffect } from "react";
import type { UserTypes } from "../types/userTypes";
import apiClient from "../apiClient";
import { loginRequest } from "../Components/Design/requests";

type AuthContextType = {
    user:UserTypes | null
    setUser:React.Dispatch<React.SetStateAction<UserTypes | null>>;
    loading:boolean
    login:(a:string, b:string) => Promise<void>
    fetchuser: () => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType| undefined>(undefined)

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState<UserTypes | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchuser = async() => {
        try{
            const token = localStorage.getItem("userToken")

            if(!token){
                setLoading(false)
                return
            }

            const response = await apiClient.get('/user/me')
            console.log(response.data)
            setUser(response.data)
        }
        catch(error:any){
            console.error(error.response.data)
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }

    // logout
    const logout = async () =>{
        localStorage.removeItem('userToken')
        setUser(null)
    }

    const login = async (email:string, password:string) => {
        try{
        const response = await loginRequest(email, password)
            const token = response.data.access_token;
            localStorage.setItem('userToken', token)
            //await fetchuser()
        }
        catch(error:any){
            console.error(error.response.data)
            throw error
        }
    }

    useEffect(()=>{
        fetchuser()
    },[])

    // context provider
    return (
        <AuthContext.Provider value={{user, loading,fetchuser, logout, setUser, login}}>
            {children}
        </AuthContext.Provider>
    )
} 