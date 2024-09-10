import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'

const Profile = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [auth,setAuth]=useAuth()

    //get user data
    useEffect(()=>{
        const {email,name,phone,address}=auth?.user
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
    },[auth?.user])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address},{
                headers:{
                    Authorization:auth?.token
                }
            })
            if(data?.error){
                alert(data?.error)
            }
            else{
                setAuth({...auth,user:data?.updatedUser})
                let ls=localStorage.getItem('auth')
                ls=JSON.parse(ls)
                ls.user=data.updatedUser
                localStorage.setItem('auth',JSON.stringify(ls))
                alert("Profile Updated Successfully")
            }
        }
        catch(error){
            console.log(error)
            alert("Something went wrong")
        }
    }

  return (
    <Layout title={"Your Profile"}>
        <div className='container-flui p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                <div className="form-container" style={{minHeight:"68vh"}}>
                <form  className="form" onSubmit={handleSubmit}>
                    <h4 className="title">User Profile</h4>
                    <div className="mb-2">
                        <input type="text"  
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter Your Name"
                        autoFocus/>
                    </div>
                    <div className="mb-2">
                        <input type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form-control" 
                        id="email" 
                        placeholder="Enter Your Email"
                        disabled/>
                    </div>
                    <div className="mb-2">
                        <input type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Your Password"
                        />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                        value={phone} 
                        onChange={(e)=>setPhone(e.target.value)}
                        className="form-control" 
                        id="phone" 
                        placeholder="Enter Your Phone No."
                        />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                        className="form-control" 
                        id="address" 
                        placeholder="Enter Your Address"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile