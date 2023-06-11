import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useRoom = conn => {

    console.log('room')
    const [searchParams] = useSearchParams();
    const [room, setRoom] = useState();
    useEffect(() => {
        if (conn) {
            // const room = conn.initJitsiConference(searchParams.get('room'), {});
            const room = conn.initJitsiConference("group15", {});
            setRoom(room);
        }

        return () => {
            if(room){
                room.leave();
                setRoom(null);
            }
        }

    }, [conn]);

    return room;
    
};

export default useRoom;