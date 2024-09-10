import React from 'react'
import { Link } from 'react-router-dom';
const Footer=()=>{
    return (
        <div className='footer'>
            <h4 className='text-center'>All Right Reserved &copy;VaibhavYT</h4>
            <p className='text-center mt-3'>
                <Link to='/contact'>Contact Us</Link>
            </p>
        </div>
    )
}
export default Footer;