import { useEffect, useState } from "react";
import { buildOptions, getToken } from "../tool/tools.ts";

const JitsiMeetJS = window.JitsiMeetJS;

const useConnect = () => {
    console.log('connect')
    const [conn, setConn] = useState();
    useEffect(() => {
        JitsiMeetJS.init();
        const connection = new JitsiMeetJS.JitsiConnection(null, getToken(), buildOptions());
        setConn(connection);
    }, []);

    return conn;
};

export default useConnect;
