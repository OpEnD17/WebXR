import * as React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-left">
        <a className="logo pull-left" href="/">
          <img
            src="https://jitsi.org/wp-content/themes/jitsi/images/logo-web-2020.png"
            alt="logo"
          />
        </a>
      </div>
      <div className="nav-right">
        {/* <a href='/'>Home</a>
        <a href='/other'>VR technology</a>
        <a href='/'>About us</a>
        <a href='/'>Search</a> */}
        <Link to="/">Home</Link>
        <Link to="/other">VR technology</Link>
        <Link to="/vr">About us</Link>
        <Link to="/">Search</Link>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
};

export default Body;
