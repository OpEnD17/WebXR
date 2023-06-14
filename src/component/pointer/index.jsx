import { Entity } from "aframe-react";
import { useEffect, useRef } from "react";

const Pointer = ({ color, pos, onclick }) => {

    const pointerRef = useRef();
    useEffect(() => {
        pointerRef.current?.el.addEventListener('click', () => {
            onclick(color);
        })
    }, [])

    return <Entity
        scale="0.5 0.5 0.5"
        ref={pointerRef}
        geometry='primitive: box'
        material={`color: #${color.substr(0, 6)}; side: double`}
        position={`${pos.x} ${pos.y} ${pos.z}`}
        repeat="indefinite"
        direction="alternate"
        animation="property: rotation; to: 0 360 0; loop: true; dur: 1000; easing: linear"
    >
    </Entity>
};

export default Pointer;