import 'aframe';
import { Entity } from "aframe-react";
import { useEffect, useRef } from 'react';

const Avatar = ({ id, pos, track }) => {

    const avatarRef = useRef(null);

    useEffect(() => {
        console.log(pos);
        if (avatarRef.current) {
            avatarRef.current.el.setAttribute("id", id);
            avatarRef.current.el.object3D.position.set(pos[0], 0, pos[1]);
            avatarRef.current.el.setAttribute('rotation', { x: 0, y: pos[2], z: 0 });
        }
    }, [pos[0], pos[1]]);

    return (
        <Entity primitive="a-box" gltf-model="avatar/scene.gltf" scale="0.1 0.1 0.1" ref={avatarRef}>
            {
                track &&  <a-video src={`#${id}video`} position="0 16.296 1.70921" geometry="width: 2; height: 1.5; segmentsWidth: 2" rotation="-15 0 0" material="" scale="3 3 3" />
            }
        </Entity>
    )
}

export default Avatar;
