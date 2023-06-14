import { buildOptions, getToken } from "../tool/tools.ts";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const JitsiMeetJS = window.JitsiMeetJS;

const useConnect = () => {

    const [searchParams] = useSearchParams();
    const [conn, setConn] = useState();

    useEffect(() => {
        JitsiMeetJS.init();
        const connection = new JitsiMeetJS.JitsiConnection(null, getToken(), buildOptions(searchParams.get('room')));
        setConn(connection);
    }, []);

    return conn;
};

export default useConnect;
