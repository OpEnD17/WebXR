import { createRef } from "react";
import options from "../../tool/options";
import { cleanupDOM, create } from '../../tool/tools.ts';

const Join = props => {
    const r_container = createRef();
    const l_container = createRef();
    const JitsiMeetJS = window.JitsiMeetJS;
    let room;
    let connection;
    const localTracks = [];
    const remoteTracks = {};
    const participantIds = new Set();

    const onLocalTracks = tracks => {
        console.log('**************local tracks**************');
        console.log(tracks);
        for (const track of tracks){
            localTracks.push(track);
        }
        for (let i in localTracks) {
            if (localTracks[i].getType() === 'video') {
                cleanupDOM("localVideo" + i);
                const video = create('video', {
                    autoplay: '1',
                    id: 'localVideo' + i,
                    width: 450,
                    height: 300
                });
                l_container.current?.append(video);
                localTracks[i].attach(video);
            } else {
                cleanupDOM("localAudio" + i);
                const audio = create('audio', {
                    autoplay: '1',
                    id: 'localAudio' + i,
                    muted: false
                });
                l_container.current?.append(audio);
                localTracks[i].attach(audio);
            }
        }
    };

    const onRemoteTrack = track => {
        console.log('**************remote track**************');
        console.log(track);

        const participant = track.getParticipantId();
        if (!remoteTracks[participant]) {
            remoteTracks[participant] = [];
        }

        console.log(remoteTracks[participant].push(track));
        if (track.getType() === 'video') {
            cleanupDOM(participant + 'video');
            const video = create('video', {
                autoplay: '1',
                id: participant + 'video',
                width: 450,
                height: 300
            });
            r_container.current?.append(video);
            track.attach(video);
        } else {
            cleanupDOM(participant + 'audio');
            const audio = create('audio', {
                autoplay: '1',
                id: participant + 'audio'
            });
            r_container.current?.append(audio);
            track.attach(audio);
        }
    }

    const onConferenceJoined = () => {
        console.log('conference joined!');
    }

    const onConnectionFailed = () => {
        console.log('connect failed');
    }

    const disconnect = async () => {
        console.log('disconnect');
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);

        for (let i = 0; i < localTracks.length; i++) {
            localTracks[i].dispose();
        }

        return await connection.disconnect();
    }

    const onUserJoined = id => {
        console.log(`User ${id} Joined!`);
        participantIds.add(id);
        room.selectParticipants(Array.from(participantIds));
    }

    const onUserLeft = id => {
        console.log(`User ${id} left!`);
        cleanupDOM(id + "video");
        cleanupDOM(id + "audio");
        delete remoteTracks[id];
        participantIds.delete(id);
        room.selectParticipants(Array.from(participantIds));
    }

    const onConnectionSuccess = () => {
        console.log('connect seccuess');
        room = connection.initJitsiConference('sp5-group15', {});
        console.log("***********room**************")
        console.log(room);
        for (let i = 0; i < localTracks.length; i++) {
            room.addTrack(localTracks[i]);
        }
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, track => {
            !track.isLocal() && onRemoteTrack(track);
        });
        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.on(JitsiMeetJS.events.conference.USER_JOINED, onUserJoined);
        room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        room.join();
    };

    const connect = async () => {
        JitsiMeetJS.init();
        connection = new JitsiMeetJS.JitsiConnection(null, null, options);
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        const tracks = await JitsiMeetJS.createLocalTracks({
            devices: ['audio', 'video']
        });
        onLocalTracks(tracks);

        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
        connection.connect();
    };

    const hangup = async () => {
        removeRemoteTracks();
        room && await room.leave();
        await disconnect();
    };

    const removeRemoteTracks = () => {
        console.log(remoteTracks);
        console.log(Object.values(remoteTracks))
        Object.values(remoteTracks).forEach(tracks=>{
            for (const track of tracks){
                for (const t of track.containers){
                    t.remove();
                }
            }
        })
    };

    return (
        <>
            <div onClick={connect}>Start meeting</div>
            <div onClick={hangup}>End meeting</div>
            <div onClick={()=> {console.log(localTracks)}}>Check local tracks</div>
            <div onClick={()=> {console.log(remoteTracks)}}>Check remote tracks</div>
            <div id="r-container" ref={r_container} onClick={() => console.log(r_container.current)}>1234</div>
            <div id="l-container" ref={l_container} onClick={() => console.log(l_container.current)}>1234</div>
        </>
    )

};

export default Join;
