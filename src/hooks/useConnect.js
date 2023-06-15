import { buildOptions, getToken } from "../tool/tools.ts";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const JitsiMeetJS = window.JitsiMeetJS;

const useConnect = () => {

    const [searchParams] = useSearchParams();
    const [conn, setConn] = useState();
    const [room, setRoom] = useState();

    useEffect(() => {
        JitsiMeetJS.init();
        const connection = new JitsiMeetJS.JitsiConnection(null, getToken(), buildOptions(searchParams.get('room')));
        const room = connection.initJitsiConference(searchParams.get('room'), {});
        setRoom(room);
        setConn(connection);

        return () => {
            room.leave();
        }

    }, []);

    return [conn, room];
};

export default useConnect;
