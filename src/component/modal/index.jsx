import { useEffect, useRef } from "react";
import "./index.css";

const Modal = props => {

    const mediaCamera = useRef();
    const videoRef = useRef();

    const stopCamera = () => {
        mediaCamera.current.getTracks()[0].stop();
    };

    const onCancel = () => {
        props.setVisible(false);
    };

    const onOk = () => {
        props.setVisible(false);
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                mediaCamera.current = stream;
            })
            .catch(err => {
                console.log(err);
                alert("Camera not available!");
            });
        return () => stopCamera();
    }, [])

    return (
        <div >
            <div className="modal-container">
                <h1 className="modal-h1">Settings</h1>
                <div className="modal-split">
                    <video autoPlay className="modal-localVideo" ref={videoRef} />
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
                    <div className="modal-button modal-cancel" onClick={onCancel}>Cancel</div>
                    <div className="modal-button modal-ok" onClick={onOk}>OK</div>
                </div>
            </div>
            <div className="mask" />
        </div>
    )
};

export default Modal;
