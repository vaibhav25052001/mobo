import React from 'react'
import { NavLink,Link} from 'react-router-dom';
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useAuth } from '../../context/Auth';
import Searchinput from '../form/Searchinput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/Cart';
const Header=()=>{
  const [auth,setAuth]=useAuth()
  const [cart]=useCart()
  const categories=useCategory()

  const handleLogout=()=>{
    setAuth({
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    alert("Logout Successfully")
  }
    return (
        <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/' className="navbar-brand"><HiMiniShoppingBag />Ecommerce</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <Searchinput />
        <li className="nav-item">
          <NavLink to='/' className="nav-link">Home</NavLink>
        </li>
        <li className='nav-item dropdown'>
          <Link className='nav-link dropdown-toggle' to={'/categories'} data-bs-toggle='dropdown'>Categories</Link>
          <ul className='dropdown-menu'>
            <li>
              <Link className='dropdown-item' to={'/categories'}>All Categories</Link>
            </li>
            {
              categories?.map(c=>(
                <li>
                  <Link className='dropdown-item' 
                        to={`/category/${c.slug}`}
                        >{c.name}</Link>
                </li>
              ))
            }
          </ul>
        </li>                 
        {
          !auth.user ? (<>
          <li className="nav-item">
          <NavLink to='/register' className="nav-link">Register</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to='/login' className="nav-link">Login</NavLink>
          </li>
          </>) : (<>
          <li className="nav-item dropdown">
            <NavLink
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            style={{border:"none"}}>
              {auth?.user?.name}
              </NavLink>
            <ul className="dropdown-menu">
            <li>
              <NavLink to={`/dashboard/${auth?.user?.role===1 ? 'admin' : 'user'}`} 
                      className="dropdown-item">Dashboard</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to='/login' className="nav-link">Logout</NavLink>
            </li>
            </ul>
          </li>
          </>)
        }
        <li className="nav-item">
          <NavLink to='/cart' 
                  className="nav-link">Cart {cart?.length}</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}
export default Header;