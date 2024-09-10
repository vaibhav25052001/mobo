import React from "react";
import Layout from "../components/Layout/Layout";
import { BiSupport , BiLogoGmail,BiPhoneCall} from "react-icons/bi";
const Contact=()=>{
    return (
        <Layout title={"ContactUs"}>
            {/* row class is used to define a horizontal grouping of columns. */}
            <div className="row contactus">
                {/* Creates a column that takes up 6 out of 12 columns on medium-sized screens. */}
                <div className="col-md-6">
                    <img src='/images/contactus.jpeg' alt="contactus" style={{width:'100%'}} />
                </div>
                {/* Creates a column that takes up 4 out of 12 columns on medium-sized screens. */}
                <div className="col-md-4">
                    {/* Displays a centered heading with a dark background and white text with padding 2 */}
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">Any query and information about product,feel free to call anytime we are 24X7
            available</p>
            <p className="mt-3"><BiLogoGmail />: www.help@ecommerceapp.com</p>
            <p className="mt-3"><BiPhoneCall />: 7357465375</p>
            <p className="mt-3"><BiSupport />: 1800-1080-1080 (toll free)</p>
                </div>
            </div>
        </Layout>
    )
}
export default Contact;