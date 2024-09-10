import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/AuthStyle.css'

const Forgot=()=>{
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [answer,setAnswer]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer})
            if(res.data.success){
                alert(res.data.message)
                navigate('/login')
            }
            else{
                alert(res.data.message)
            }      
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }

    }
    return (
        <Layout title={"Forgot-Password"}>
            <div className="form-container" style={{minHeight:"70vh"}}>
                <form  className="form" onSubmit={handleSubmit}>
                    <h4 className="title">Forgot Password</h4>
                    <div className="mb-3">
                        <input type="email" 
                        value={email} 
                        onChange={(e)=>setEmail((e.target.value))}
                        className="form-control" 
                        id="email" 
                        placeholder="Enter Your Email"
                        required />
                    </div>
                    <div className="mb-3">
                        <input type="password" 
                        value={newPassword} 
                        onChange={(e)=>setNewPassword(e.target.value)}
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Your New Password"
                        required />
                    </div>
                    <div className="mb-3">
                        <input type="text" 
                        value={answer} 
                        onChange={(e)=>setAnswer(e.target.value)}
                        className="form-control" 
                        id="answer" 
                        placeholder="Enter Your Favourite Cricketer"
                        required />
                    </div>
                    <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Continue</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
export default Forgot