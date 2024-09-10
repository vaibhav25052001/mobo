import {useState,createContext, useContext} from "react";

//It will be used to pass the authentication-related state and functions down the component tree.
const SearchContext=createContext()

export const SearchProvider=({children})=>{
    const [auth,setAuth]=useState({
    //Initial state of auth,This is a common pattern for initializing authentication-related state before user logs in.
        keyword:"",
        result:[]
    })
    return (
        // Provide auth state and setAuth function to the child components
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
//custom hook
export const useSearch=()=>useContext(SearchContext)