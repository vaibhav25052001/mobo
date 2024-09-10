import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth} from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import '../styles/CartStyle.css'

const Cart = () => {
    const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()
    const [clientToken,setClientToken]=useState('')
    const [instance,setInstance]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()


    //total price
    const totalPrice=()=>{
        try {
            let total=0
            cart?.map(item =>{
                total=total+item.price
            });
            return total.toLocaleString('en-in',{
                style:"currency",
                currency:"INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //delete item
    const removeCartItem=(pid)=>{
        try {
            let myCart=[...cart]
            let index=myCart.findIndex(item=>item.id===pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    //payment integration
    const getToken=async(req,res)=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`,{
                headers:{
                    "Authorization":auth?.token
                }
            })
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getToken()
    })

    //handle payment
    const handlePayment=async()=>{
        try {
            const {nonce}=await instance.requestPaymentMethod()
            const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
                nonce,
                cart,
            },{
                headers:{
                    "Authorization":auth?.token
                }
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

  return (
    <Layout title={"Cart"}>
        <div className='cart-page'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {!auth?.user ? "Hello guest" : `Hello ${auth?.token && auth?.user?.name}`}
                        <p className='text-center'>
                        {cart?.length ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout !"}` : "You Cart is Empty"}
                        </p>
                    </h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    {
                        cart?.map(p=>(
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                                    className='card-img-top' 
                                    alt={p.name}
                                    width="100px"
                                    height={"200px"} />
                                </div>
                                <div className='col-md-8'>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0,30)}</p>
                                    <p>Price: {p.price}</p>
                                    <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-md-4 text-center'>
                    <h4>Cart Summary</h4>
                    <p>Checkout</p>
                    <hr />
                    <h4>Total : {totalPrice()} </h4>
                    {
                        auth?.user?.address ? (
                            <div className='mb-3'>
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning'
                                        onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                            </div>
                        ):(
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning'
                                                onClick={()=>navigate('/dashboard/user/profile')}></button>
                                    ) : (
                                        <button className='btn btn-outline-warning'
                                                onClick={()=>navigate('/login',{
                                                    state:'/cart'
                                                })}>Please Login to checkout</button>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className='mt-2'>
                        {!clientToken || !auth?.token || !cart?.length ? (""):(
                            <>
                            <DropIn
                        options={{
                            authorization:clientToken,
                            // paypal:{
                            //     flow:'vault'
                            // }
                        }}
                        onInstance={instance=>setInstance(instance)} 
                        />
                    <button className='btn btn-primary' onClick={handlePayment} 
                    disabled={loading || !instance || !auth?.user?.address}>
                        {loading ? "Processing....." : "Make Payment"}
                    </button>
                            </>
                        )}
                </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cart