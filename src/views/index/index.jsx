import Nav from '../../component/nav';
import Swiper from '../../component/swiper';
import Body from "../../layout/Body";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import "./index.css";

const Layout = () => {
    return (
        <>
            <Nav />
            <Swiper />
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
