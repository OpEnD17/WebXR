import { useEffect } from "react";

const useMovement = sendInfo => {
    
    useEffect(()=>{
        document.getElementById('floor').addEventListener('mouseup', e => {
            const point = e.detail.intersection.point;
            console.log(point);
            document.getElementById('cameraRig').setAttribute('position', point);
        });
    }, []);

    return null;
};

export default useMovement;
