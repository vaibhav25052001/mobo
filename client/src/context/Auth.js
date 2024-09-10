import {useState,useEffect,createContext, useContext} from "react";

//It will be used to pass the authentication-related state and functions down the component tree.
const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
    //Initial state of auth,This is a common pattern for initializing authentication-related state before user logs in.
        user:null,
        token:""
    })
    //  It is retrieving authentication data from the local storage and updating the auth state with that data
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint-disable-next-line
    },[])
    //Empty dependency array means effect will run once, only when the component is rendered.
    return (
        // Provide auth state and setAuth function to the child components
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
//custom hook
export const useAuth=()=>useContext(AuthContext)