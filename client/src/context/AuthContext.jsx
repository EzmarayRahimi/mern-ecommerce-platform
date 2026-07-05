import {createContext , useContext , useState } from 'react'


const  AuthContext = createContext();


function AuthProvider({children}){

    const [userInfo , setUserInfo] = useState(()=>{
        const storedUser = localStorage.getItem("userInfo")

        return      storedUser ? JSON.parse(storedUser) : null
    })

    const loginUser = (userData)=>{
        setUserInfo(userData)

    }

    const logoutUser = ()=>{
              localStorage.removeItem("userInfo")
              setUserInfo(null)
    }
   return <AuthContext.Provider value = {{userInfo ,loginUser , logoutUser}} >
    {children}
   </AuthContext.Provider>
   
} 

export function useAuth(){
    return useContext(AuthContext)
}

export default AuthProvider