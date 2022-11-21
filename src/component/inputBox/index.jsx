import "./index.css";

import { useNavigate } from "react-router";
import { useRef } from "react";
import { createSearchParams } from "react-router-dom";

const InputBox = props => {

    const navigate = useNavigate();
    const roomName = useRef({
        room: null
    });

    return (

        <div className='inputBox-container'>
            <input
                className='input'
                onChange={e => {
                    roomName.current.room = e.target.value;
                }}
                placeholder='Enter meeting room ...'
            />
            <div
                className="button"
                onClick={() => {
                    roomName.current.room !== null && navigate({
                        pathname: props.target.current,
                        search: `?${createSearchParams(roomName.current)}`
                    });
                }}
            >
                Start meeting
            </div>
        </div>


    )
};

export default InputBox;
