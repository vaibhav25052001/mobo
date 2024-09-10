import React,{useState}from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import '../../styles/AuthStyle.css'
import { useAuth } from "../../context/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()

    const navigate=useNavigate()
    const location=useLocation()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
            if(res && res.data.success){
               toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))

                navigate(location.state || '/')
            }
            else{
                alert(res.data.message)
            }
        }
        catch(error){
            console.log(error)
            alert("Something went wrong")
        }
    }

    return (
        <Layout title="Login">
            <div className="form-container" style={{minHeight:"68vh"}}>
                <form  className="form" onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div className="mb-3">
                        <input type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form-control" 
                        id="email" 
                        placeholder="Enter Your Email"
                        required />
                    </div>
                    <div className="mb-3">
                        <input type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Your Password"
                        required />
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                    </div>

                    <div className="mt-3">
                    <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Layout>
    )
}
export default Login;