//why we create this -> because we want  header footer format in every pages 
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet'

//children is a special prop in React that represents the content passed between opening and closing tags of a component.
const Layout=({children,description,keywords,author,title})=>{
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header/>
            <main style={{minHeight:'68vh'}}>
                {children}</main>
            <Footer/>
        </div>
    )
}
Layout.defaultProps={
    title:'Ecommerce App',
    description:'Mern Stack Project',
    keywords:'mern,react,node,mongoDb',
    author:'VAIBHAV'
}
export default Layout;