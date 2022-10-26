import './index.css';
import { useRef } from 'react'
import src from './img/1.jpg'
import womenSrc from './img/2.jpg'
const Login = () => {
    const loginRef = useRef()
    const signupRef = useRef()
    const handleLogin = () => {
        loginRef.current.style.transform = "rotateY(180deg)"
        signupRef.current.style.transform = "rotateY(0deg)";
    }
    const handleSignup = () => {
        loginRef.current.style.transform = "rotateY(0deg)"
        signupRef.current.style.transform = "rotateY(180deg)";
    }
    return (
        <div className='big_box'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <div className="user">
                <i className="fa fa-user"></i>
                <div className="head">account login</div>
            </div>
            <div className="container">
                <div className="box login" ref={loginRef}>
                    <div className="form-content">
                        <div className="avtar">
                            <div className="pic"><img src={src} alt=""></img></div>
                        </div>
                        <h1>Welcome back</h1>
                        <form action="#" className="form">
                            <div>
                                <i className="fa fa-user-o"></i>
                                <input type="text" placeholder="username"></input>
                            </div>
                            <div>
                                <i className="fa fa-key"></i>
                                <input type="password" placeholder="password"></input>
                            </div>
                            <div className="btn">
                                <button>login</button>
                            </div>
                        </form>
                        <p className="btn-something">
                            Don't have an account ? <span className="signupbtn" onClick={handleLogin}>signup</span>
                        </p>
                    </div>
                </div>
                <div className="box signup" ref={signupRef}>
                    <div className="form-content">
                        <div className="avtar">
                            <div className="pic"><img src={womenSrc} alt=""></img></div>
                        </div>
                        <h1>Let's get started</h1>
                        <form action="#" className="form">
                            <div>
                                <i className="fa fa-user-o"></i>
                                <input type="text" placeholder="username"></input>
                            </div>
                            <div>
                                <i className="fa fa-envelope-o"></i>
                                <input type="email" placeholder="email"></input>
                            </div>
                            <div>
                                <i className="fa fa-key"></i>
                                <input type="password" placeholder="password"></input>
                            </div>
                            <div className="btn">
                                <button>signup</button>
                            </div>
                        </form>
                        <p className="btn-something">
                            Already have an account ? <span className="loginbtn" onClick={handleSignup}>login</span>
                        </p>
                    </div>
                </div>
            </div></div>
    )

}

export default Login