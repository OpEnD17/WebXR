import 'aframe';
import { Entity } from "aframe-react";
import { useEffect, useRef } from 'react';

const Avatar = ({ id, info, track }) => {

    const headRef = useRef();
    const bodyRef = useRef();
    const avatarRef = useRef();

    useEffect(() => {
        headRef.current?.el.setAttribute('rotation', { x: info[2], y: info[3], z: info[4] });
        bodyRef.current?.el.setAttribute('rotation', { x: 0, y: info[3], z: 0 });
        avatarRef.current?.el.object3D.position.set(info[0], 0.9, info[1])

    }, [info[0], info[1], info[2], info[3], info[4], info[5]]);

    return (

        <Entity id='avatar' scale="0.5 0.5 0.5" ref={avatarRef}>
            <Entity ref={headRef}>
                <a-box id="head" color={`#${info[5]}`} position="0 1.2 0" material="" geometry=""></a-box>
                {
                    track
                    && <a-video src={`#${id}video`} width="1" height="1" position="0 1.2 0.51" material="" geometry=""></a-video>
                }
            </Entity>
            <Entity id='body' ref={bodyRef}>
                <a-box scale="1 0.2 0.5" material="" geometry="" position="0 0.6 0" color={`#${info[5]}`}></a-box>
                <a-box scale="0.7 1 0.5" material="" geometry="" color={`#${info[5]}`}></a-box>
                <a-box id="arml" material="" geometry="" scale="0.2 1 0.2" position="0.6 0 0" rotation="0 0 20"></a-box>
                <a-box id="armr" material="" geometry="" scale="0.2 1 0.2" position="-0.6 0 0" rotation="0 0 -20"></a-box>
                <a-box id="legl" material="" geometry="" scale="0.4 1.2 0.4" position="-0.28 -1 0" rotation="0 0 -10"></a-box>
                <a-box id="legr" material="" geometry="" scale="0.4 1.2 0.4" position="0.28 -1 0" rotation="0 0 10"></a-box>
            </Entity>
        </Entity>
    )
}

export default Avatar;
