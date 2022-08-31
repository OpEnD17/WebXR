import InputBox from '../../component/inputBox';

import './index.css';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Header = () => {
    return (
        <div>
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
                <InputBox />
            </div>

            <div className="icon-container">
                <SettingsOutlinedIcon className='icon-center'/>
            </div>
        </div>
    )
};

export default Header;
