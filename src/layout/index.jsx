import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

import "./index.css"

const Layout = props => {


    return (
        <>
            <div className='header-container'>
                <Header />
            </div>
            <div className='body-container'>
                <Body />
            </div>
            <div className='footer-container'>
                <Footer />
            </div>
        </>
    )
};

export default Layout;
