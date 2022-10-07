import "./index.css";

import { useNavigate } from "react-router";

const InputBox = props => {

    const navigate = useNavigate();

    return (

        <div className='inputBox-container'>
            <input
                className='input'
                onChange={e => console.log(e.target.value)}
                placeholder='Enter meeting room ...'
            />
            <div
                className="button"
                onClick={() => {
                    navigate('/conference');
                }}
            >
                Start meeting
            </div>
        </div>


    )
};

export default InputBox;
