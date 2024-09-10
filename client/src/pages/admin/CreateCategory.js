import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//To create a new floating layer over the current page to get user feedback or display information
import { Modal } from 'antd'

const CreateCategory = () => {
   const [categories,setCategories]=useState([])
   const [name,setName]=useState("")
   const [visible,setVisible]=useState(false)
   const [selected,setSelected]=useState(null)
   const [updatedName,setUpdatedName]=useState("")

  //handle form
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name},{
        headers:{
          Authorization:`${JSON.parse(localStorage.getItem("auth")).token}`
        }
      })   
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
    }
}

  //get all category
  const getAllCategory=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){ 
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong in getting category')
    }
  }
  useEffect(()=>{
    getAllCategory()
  },[])

  //update category
   const handleUpdate=async(e)=>{
     e.preventDefault()
    try {
      const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName},{
        headers:{
          Authorization:`${JSON.parse(localStorage.getItem("auth")).token}`
        }
      })
      if(data?.success){
        alert(data.message)

        setSelected(null)
        setUpdatedName("")
        //to off the visibility of pop-up 
        setVisible(false)

        getAllCategory()
      }
    } catch (error) {
      console.log(error)
    }
   }

   //delete category
   const handleDelete=async(id)=>{
   try {
     const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,{
       headers:{
         Authorization:`${JSON.parse(localStorage.getItem("auth")).token}`
       }
     })
     if(data?.success){
      const mytoast =  toast(data.message)

       getAllCategory()
     }
   } catch (error) {
     console.log(error)
   }
  }
  return (
    <Layout title={"Create Category"}>
      <div className="container-fluid m-3 p-3">
      <div className='row'>
      <div className='col-md-3'>
        <AdminMenu />
      </div>
      <div className='col-md-9'>
        <h3>Manage Category</h3>
        <div className='w-50'>
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
        </div>
        <div className='w-75'>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        categories?.map(c=>(
          <>
          <tr>
            <td key={c._id}>{c.name}</td>
            <td>
              <button className='btn btn-primary' onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
              <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id)}}>Delete</button>
              
              </td>
          </tr>
          </>
        ))
      }
  </tbody>
</table>
        </div>
        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
      </div>
      </div>
      </div>
      <ToastContainer />
    </Layout>
  )
}

export default CreateCategory