import "./index.css";

import { MyContext } from "../../App";

import { useRef, useContext } from 'react';
import axios from "axios";

const Modal = props => {

    let mediaCamera;


    const stopCamera = () => {
        mediaCamera.getTracks()[0].stop();
    }

    if (props.visible) {
        const video = document.getElementById("local-video");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                mediaCamera = stream;
            })
            .catch(err => {
                console.log(err);
                alert("Camera not available!");
            });
    }

    const handleCancel = () => {
        props.setVisible(false);
        stopCamera();
    }

    const handleOk = () => {
        props.setVisible(false);
        stopCamera();
    }

    return (
        <div style={{ display: props.visible ? "block" : "none" }} >
            <div className="modal-container">
                <h1 className="modal-h1">Settings</h1>
                <div className="modal-split">
                    <video autoPlay className="modal-localVideo" id="local-video" />
                    <div className="modal-right">
                        <div>Select output:</div>
                        <input type="radio" name="output" defaultChecked id="screen" onClick={() => props.changeTarget("/conference")} />
                        <label htmlFor="screen">screen</label>
                        <br></br>
                        <input type="radio" name="output" id="vr" onClick={() => props.changeTarget("/webxr")} />
                        <label htmlFor="vr">VR device</label>
                    </div>
                </div>

                <div className="modal-buttons">
                    <div className="modal-button modal-cancel" onClick={handleCancel}>Cancel</div>
                    <div className="modal-button modal-ok" onClick={handleOk}>OK</div>
                </div>
            </div>
            <div className="mask" />
        </div>
    )
};

export default Modal;
