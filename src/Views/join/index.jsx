import { createRef } from "react";
import options from "../../tool/options";
import { create } from '../../tool/tools';

const Join = props => {
    const r_container = createRef();
    const l_container = createRef();
    const JitsiMeetJS = window.JitsiMeetJS;
    let room;
    let localTracks = [];
    const remoteTracks = {};
    JitsiMeetJS.init();
    const connection = new JitsiMeetJS.JitsiConnection(null, null, options);
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

    const onConferenceJoined = () => {
        console.log('conference joined!');
    }

    const onConnectionFailed = () => {
        console.log('connect failed');
    }

    const disconnect = () => {
        console.log('disconnect');
    }

    const onLocalTracks = tracks => {
        console.log('**************local tracks**************');
        console.log(tracks);
        localTracks = tracks;
        for (let i in localTracks) {
            if (localTracks[i].getType() === 'video') {
                const video = create('video', {
                    autoplay: '1',
                    id: 'localVideo' + i,
                    width: 450,
                    height: 300
                });
                l_container.current?.append(video);
                localTracks[i].attach(video);
            } else {
                const audio = create('audio', {
                    autoplay: '1',
                    id: 'localAudio' + i,
                    muted: false
                });
                l_container.current?.append(audio);
                localTracks[i].attach(audio);
            }
            room && room.addTrack(localTracks[i]);
        }
    }

    const onRemoteTrack = track => {
        console.log('**************remote track**************');
        console.log(track);
        if (track.isLocal()) {
            return;
        }
        const participant = track.getParticipantId();
        console.log(participant);
        if (track.getType() === 'video') {
            const video = create('video', {
                autoplay: '1',
                id: participant + 'video',
                width: 450,
                height: 300
            });
            r_container.current?.append(video);
            track.attach(video);
        } else {
            const audio = create('audio', {
                autoplay: '1',
                id: participant + 'audio'
            });
            r_container.current?.append(audio);
            track.attach(audio);
        }
        // room && room.addTrack(track);
    }

    const onConnectionSuccess = () => {
        console.log('connect seccuess');
        room = connection.initJitsiConference('sp5-group15', {});
        console.log("***********room**************")
        console.log(room);
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack)
        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('***************user join*************');
            console.log(id);
        });
        room.join();
    };

    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
    connection.connect();
    JitsiMeetJS.createLocalTracks({
        devices: ['audio', 'video']
    }).then(onLocalTracks)
        .catch(error => {
            throw error;
        })


    return (
        <>
            <div>video</div>
            <div id="r-container" ref={r_container} onClick={() => console.log(r_container.current)}>1234</div>
            <div id="l-container" ref={l_container} onClick={() => console.log(l_container.current)}>1234</div>
        </>
    )

};

export default Join;
