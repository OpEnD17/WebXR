import { Entity } from "aframe-react";
import { useEffect, useRef } from "react";

const Pointer = ({ color, pos, onclick }) => {

    const pointerRef = useRef();
    useEffect(() => {
        pointerRef.current?.el.addEventListener('click', () => {
            onclick(color);
        });
    }, []);

    return (
        <Entity
            ref = {pointerRef}
            id = {`${color}pointer`}
            position={`${pos.x} ${pos.y} ${pos.z}`}
            animation={`
                property: position; 
                dir: alternate; 
                dur: 800; 
                loop: true; 
                to: ${pos.x} ${pos.y + 0.3} ${pos.z}; 
                easing: linear
            `}
        >
            <a-entity
                geometry="primitive: cone; height: 0.3; radiusBottom: 0.2;"
                material={`color: #${color.substr(0, 6)};`}
                position="0 0.15 0"
                rotation="180 0 0" />
            <a-entity
                geometry="primitive: cylinder; height: 0.5; radius: 0.05"
                material={`color: #${color.substr(0, 6)};`}
                position="0 0.5 0"
            />
        </Entity>
    )

};

export default Pointer;