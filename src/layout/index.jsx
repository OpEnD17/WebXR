import InputBox from '../component/inputBox';
import Modal from '../component/modal';

import "./index.css";

import { useState, useRef } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


const Layout = props => {

    const [visible, setVisible] = useState(false);
    const target = useRef("./webxr");
    const changeTarget = t => {
        target.current = t;
    };

    return (
        <>
            <div className='header-container'>
                <div className='header-left-description'>
                    <div className='header-title'>
                        WebXR based Video Conferencing
                    </div>
                    <div className='header-title'>
                        Start and join meetings for free
                    </div>
                    <div className='header-subtitle'>
                        No account needed
                    </div>
                    <InputBox target={target} />
                </div>

                <div className="icon-container" onClick={() => setVisible(true)}>
                    <SettingsOutlinedIcon className='icon-center' />
                </div>

                {
                    visible
                    && <Modal setVisible={setVisible} changeTarget={changeTarget} />
                }
            </div>
        </>
    )
};

export default Layout;
