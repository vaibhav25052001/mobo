import React,{ useEffect,useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export const AdminRoute=()=>{
    const [ok,setOk]=useState(false)
    const [auth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            // Send HTTP GET request
            const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,{
                headers:{
                    "Authorization":auth?.token
                }
            })
            if(res.data.ok){
                setOk(true)
            }
        }
        // It means,if user logs in => token is not empty
        if(auth?.token)
        authCheck()
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner path='' />
}