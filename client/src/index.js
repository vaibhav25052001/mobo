import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/Auth';
import { SearchProvider } from './context/Search';
import {CartProvider} from './context/Cart'
import 'antd/dist/reset.css'

//why we use routing ->Routing allows users to move between different pages of an application without reloading entire page
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //It is used to wrap the entire application,
  //making the authentication context available to all components through useAuth hook. 
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
