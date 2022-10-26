import * as React from 'react';
import { useState } from 'react';
import './index.css';

const Body = () => {
  const [active, setActive] = useState(1)
  const images = [
    'https://cdn-sem-themes.aunbox.cn/themes/lupingds/win_lupingds_tongyong_3.2/img/function_pg1.png',
    'https://cdn-sem-themes.aunbox.cn/themes/lupingds/win_lupingds_tongyong_3.2/img/function_pg2.png',
    'https://cdn-sem-themes.aunbox.cn/themes/lupingds/win_lupingds_tongyong_3.2/img/function_pg3.png'
  ]
  return (

    <div className='func-wrapper'>
      <div className='func-title'>
        <h1>我们的特色</h1>
      </div>
      <div className='func-content'>
        <div className='func-content-left'>
          <div className={`func-content-left-item ${active === 1 ? 'on' : ''}`}
            onMouseEnter={() => {
              setActive(1)
            }}>
            应用VR
          </div>
          <div className={`func-content-left-item ${active === 2 ? 'on' : ''}`}
            onMouseEnter={() => {
              setActive(2)
            }}>
            放大镜
          </div>
          <div className={`func-content-left-item ${active === 3 ? 'on' : ''}`}
            onMouseEnter={() => {
              setActive(3)
            }}>
            边录边涂鸦
          </div>
        </div>
        <div className='func-content-right'>
          <img src={`${images[active - 1]}`}  alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Body;
