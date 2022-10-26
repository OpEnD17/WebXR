import InputBox from '../../component/inputBox';

import './index.css';


const Header = () => {
    return (
        <div>
            <div className='header-left-description'>
                <div className='header-title'>
                    WebXR based Video Conferencing
                </div>
                <div className='header-title' onClick={
                    // window.location.href="https://meet.jit.si/HumorousIntakesProvideObjectively"
                    console.log("1111111111")
                }>
                    Start and join meetings for free
                </div>
                <div className='header-subtitle'>
                    No account needed
                </div>
                <InputBox />
            </div>
{/* 
            <div className="icon-container">
                <SettingsOutlinedIcon className='icon-center'/>
            </div> */}
        </div>
    )
};

export default Header;
