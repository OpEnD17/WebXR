import options from "../../tool/options";
import { create } from '../../tool/tools';

const Join = props => {
    const JitsiMeetJS = window.JitsiMeetJS;
    let room;
    const connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    const onConferenceJoined = () => {
        console.log('conference joined!')
    }

    const onConnectionFailed = () => {
        console.log('connect failed');
    }

    const disconnect = () => {
        console.log('disconnect');
    }

    const onRemoteTrack = track => {
        console.log('remote track');
        console.log(track);
    }

    const onConnectionSuccess = () => {
        console.log('connect seccuess');
        room = connection.initJitsiConference('sp5-group15', {});
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack)
        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.join();
    };

    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
    connection.connect();


    return (
        <>
            <div>video</div>
        </>
    )

};

export default Join;
