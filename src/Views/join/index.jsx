import "./index.css";

import options from "../../tool/options";
import { cleanupDOM, create } from '../../tool/tools.ts';

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const Join = props => {

    const JitsiMeetJS = window.JitsiMeetJS;
    const track_container = useRef();
    const largeVideo = useRef();
    const room = useRef();
    const connection = useRef();
    const localTracks = useRef([]);
    const remoteTracks = useRef({});
    // const participantIds = new Set();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [large, setLarge] = useState();

    const onlocalTracks = tracks => {
        // console.log('**************local tracks**************');
        // console.log(tracks);

        for (const track of tracks) {
            localTracks.current.push(track);
        }

        for (let i in localTracks.current) {
            if (localTracks.current[i].getType() === 'video') {
                cleanupDOM("localVideo" + i);
                const func = () => {
                    console.log(large);
                    // large.detach(largeVideo.current);
                    setLarge(localTracks.current[i]);
                }
                const video = create('video', {
                    autoplay: '1',
                    id: 'localVideo' + i,
                    width: 300,
                    // height: 300,
                    class: "localVideo videoTrack",
                });
                video.addEventListener('click', func, false);
                track_container.current?.append(video);
                localTracks.current[i].attach(video);
                console.log(localTracks.current[i]);
                setLarge(localTracks.current[i]);
            } else {
                // cleanupDOM("localAudio" + i);
                // const audio = create('audio', {
                //     autoplay: '1',
                //     id: 'localAudio' + i,
                //     muted: false
                // });
                // l_container.current?.append(audio);
                // localTracks.current[i].attach(audio);
            }
        }
    };

    const onRemoteTrack = track => {
        // console.log('**************remote track**************');
        // console.log(track);

        const participant = track.getParticipantId();
        if (!remoteTracks.current[participant]) {
            remoteTracks.current[participant] = [];
        }

        // console.log(remoteTracks.current[participant].push(track));
        if (track.getType() === 'video') {
            cleanupDOM(participant + 'video');
            const func = () => {
                console.log(large);
                // large.detach(largeVideo.current);
                setLarge(track);
            }
            const video = create('video', {
                autoplay: '1',
                id: participant + 'video',
                width: 300,
                // height: 300,
                class: "remoteVideo videoTrack",
                // onclick: () => {
                //     large.detach(largeVideo.current);
                //     setLarge(track);
                // },
            });
            video.addEventListener('click', func, false);
            track_container.current?.append(video);
            track.attach(video);
        } else {
            cleanupDOM(participant + 'audio');
            const audio = create('audio', {
                autoplay: '1',
                id: participant + 'audio'
            });
            track_container.current?.append(audio);
            track.attach(audio);
        }
    };

    const onConferenceJoined = () => {
        console.log('conference joined!');
    };

    const onConnectionFailed = () => {
        console.log('connect failed');
    };

    const disconnect = async () => {
        console.log(connection);
        connection.current.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        connection.current.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        connection.current.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);

        for (let i = 0; i < localTracks.current.length; i++) {
            localTracks.current[i].dispose();
        }

        return await connection.current.disconnect();
    };

    const onUserJoined = id => {
        console.log(`User ${id} Joined!`);
        // participantIds.add(id);
        // room.current.selectParticipants(Array.from(participantIds));
    };

    const onUserLeft = id => {
        console.log(`User ${id} left!`);
        cleanupDOM(id + "video");
        cleanupDOM(id + "audio");
        delete remoteTracks.current[id];
        // participantIds.delete(id);
        // room.current.selectParticipants(Array.from(participantIds));
    };

    // sp5-group15
    const onConnectionSuccess = () => {
        console.log('connect seccuess');
        room.current = connection.current.initJitsiConference(searchParams.get('room'), {});
        console.log("***********room**************")
        console.log(room);
        for (let i = 0; i < localTracks.current.length; i++) {
            room.current.addTrack(localTracks.current[i]);
        }
        room.current.on(JitsiMeetJS.events.conference.TRACK_ADDED, track => {
            !track.isLocal() && onRemoteTrack(track);
        });
        room.current.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.current.on(JitsiMeetJS.events.conference.USER_JOINED, onUserJoined);
        room.current.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        room.current.join();
    };

    const connect = async () => {
        JitsiMeetJS.init();
        connection.current = new JitsiMeetJS.JitsiConnection(null, null, options);
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        const tracks = await JitsiMeetJS.createLocalTracks({
            devices: ['audio', 'video']
        });
        onlocalTracks(tracks);
        console.log(connection);
        connection.current.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        connection.current.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
        connection.current.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
        connection.current.connect();
    };

    const hangup = async () => {
        await disconnect();
        removeRemoteTracks();
        room.current && await room.current.leave();
        navigate("/");
    };

    const removeRemoteTracks = () => {
        console.log(remoteTracks.current);
        console.log(Object.values(remoteTracks.current))
        Object.values(remoteTracks.current).forEach(tracks => {
            for (const track of tracks) {
                for (const t of track.containers) {
                    t.remove();
                }
            }
        })
    };

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        large?.attach(largeVideo.current);
    }, [large]);

    return (
        <>
            {/* <div onClick={connect}>Start meeting</div> */}
            {/* <div onClick={hangup}>End meeting</div> */}
            {/* <div onClick={() => { console.log(localTracks.current) }}>Check local tracks</div>
            <div onClick={() => { console.log(remoteTracks.current) }}>Check remote tracks</div> */}
            <div className="conference-container" >
                <div className="largeVideo-container">
                    <div className="large-video"></div>
                    <video autoPlay className="large-video" ref={largeVideo} />
                    <div className="tool-bar" >
                        <div className="leave-button" onClick={hangup}>leave</div>
                    </div>
                </div>
                <div
                    className="track-container"
                    ref={track_container}
                >
                </div>
            </div>
        </>
    );

};

export default Join;
