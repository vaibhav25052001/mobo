import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../styles/CategoryProductStyle.css'

const CategoryProduct = () => {
  const params=useParams()
  const navigate=useNavigate()
  const [products,setProducts]=useState([])
  const [category,setCategory]=useState([])

  useEffect(()=>{
    if(params?.slug)
    getProductByCategory()
  },[params?.slug])

  const getProductByCategory=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
        <div className='container mt-3'>
          <h3 className='text-center'>Category- {category?.name}</h3>
          <h3 className='text-center'>{products?.length} result found</h3>
          <div className='row'>
            <div className='col-md-9 offset-1'>
              <div className="d-flex flex-wrap">
                  {products?.map(p=>( 
                      <div className='card m-2' key={p._id}>
                          <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                            <div className='card-body'>
                              <div className='card-name-price'>
                              <h5 className='card-title'>{p.name}</h5>
                              <h5 className='card-title card-price'>{
                                p.price.toLocaleString('en-in',{
                                  style:"currency",
                                  currency:"INR"
                                })
                              }</h5>
                              </div>
                              <p className='card-text'>{p.description.substring(0,30)}</p>
                              <div className='card-name-price'>
                              <button className="btn btn-primary" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                              </div>
                            </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct