import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot'
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateOrder from './pages/admin/CreateOrder';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct'
import Cart from './pages/CartPage';
import Success from './pages/Success';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Routes>
      {/* Defines a mapping between route and React element */}
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/success' element={<Success />} />

      {/* dashboard page is protected,it only access when aunthenication successfull */}
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/orders' element={<Orders />} />
        <Route path='user/profile' element={<Profile />} />
      </Route>

       {/* We want different-2 dashboard for user and admin */}
      <Route path='/dashboard' element={<AdminRoute />}>
        <Route path='admin' element={<AdminDashboard />} /> 
        <Route path='admin/create-category' element={<CreateCategory />} /> 
        <Route path='admin/create-product' element={<CreateOrder />} /> 
        <Route path='admin/product/:slug' element={<UpdateProduct />} /> 
        <Route path='admin/users' element={<Users />} /> 
        <Route path='admin/orders' element={<AdminOrders />} /> 
        <Route path='admin/products' element={<Products />} /> 
        </Route>
        
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/forgot-password' element={<Forgot />} />

      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App;
