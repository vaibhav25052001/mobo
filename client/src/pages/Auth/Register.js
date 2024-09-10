import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

//axios-> Send asynchronous HTTP requests to server and handle the responses.
//It supports promises, making it easy to work with asynchronous code using async/await or .then() syntax.
//It supports features like request and response headers and transformation,and automatic transformation of JSON data.
import axios from 'axios';
import '../../styles/AuthStyle.css'

const Register=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [answer,setAnswer]=useState("")
    const navigate=useNavigate()

    //form function 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer})
            console.log(res);
            if(res.data.success){
                alert(res.data.message)
                navigate('/login')
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
        <Layout title="Registeration">
            <div className="form-container" style={{minHeight:"68vh"}}>
                <form  className="form" onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-2">
                        <input type="text"  
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter Your Name"
                        required 
                        autoFocus/>
                    </div>
                    <div className="mb-2">
                        <input type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form-control" 
                        id="email" 
                        placeholder="Enter Your Email"
                        required />
                    </div>
                    <div className="mb-2">
                        <input type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Your Password"
                        required />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                        value={phone} 
                        onChange={(e)=>setPhone(e.target.value)}
                        className="form-control" 
                        id="phone" 
                        placeholder="Enter Your Phone No."
                        required />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                        className="form-control" 
                        id="address" 
                        placeholder="Enter Your Address"
                        required />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                        value={answer} 
                        onChange={(e)=>setAnswer(e.target.value)}
                        className="form-control" 
                        id="answer" 
                        placeholder="Who is your favourite cricketer?"
                        required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}
export default Register;