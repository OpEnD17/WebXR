import * as React from 'react';
import './index.css';
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className='nav-wrapper'>
      <div className='nav-left'>
        <a class="logo pull-left" href="/">
          <img src="https://jitsi.org/wp-content/themes/jitsi/images/logo-web-2020.png" alt="logo"/>
        </a>
      </div>
      
      <div className='nav-right'>
        <a href='/'>主页</a>
        <a href='/other'>关于我们</a>
        <a href='/'>VR技术</a>
        <a href='/'>搜索</a>
      </div>
      <Link to='/Login'>登录</Link>
    </div>
  )
}

export default Body;
