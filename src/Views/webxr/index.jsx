import { createDOM, cleanupDOM, buildOptions } from "../../tool/tools.ts";
import token from "../../tool/token";

import "aframe";
import { Entity, Scene } from "aframe-react";

import floor from "../../assets/image/floor.jpg";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const aframe = window.AFRAME;

aframe.registerComponent('play', {
    init: function () {
        var myEL = document.querySelector("#yellow");
        this.el.addEventListener('click', function () {
            myEL.components.sound.playSound();
        });
    }
});
aframe.registerComponent('stop', {
    init: function () {
        var myEL = document.querySelector("#yellow");
        this.el.addEventListener('click', function () {
            myEL.components.sound.stopSound();
        });
    }
});
aframe.registerComponent('read-position', {
    tick: function(){
        console.log(this.el.object3D.position);
    }
});

const WebXR = () => {

    const container = useRef();
    const scene = useRef();
    const camera = useRef();
    const JitsiMeetJS = window.JitsiMeetJS;
    let room;
    let connection;
    const localTracks = [];
    const remoteTracks = {};
    const [searchParams] = useSearchParams();
    const participantIds = new Set();
    const videoArray = useRef();

    const onLocalTracks = tracks => {
        console.log('**************local tracks**************');
        console.log(tracks);
        for (const track of tracks) {
            localTracks.push(track);
        }
        for (let i in localTracks) {
            if (localTracks[i].getType() === 'video') {
                cleanupDOM("localVideo" + i);
                const video = createDOM('video', {
                    autoplay: '1',
                    id: 'localVideo' + i,
                    width: 450,
                    height: 300
                });
                container.current?.append(video);
                localTracks[i].attach(video);
                document.getElementById("localScreen").setAttribute("src", "#localVideo" + i);
            }
            // else {
            //     cleanupDOM("localAudio" + i);
            //     const audio = createDOM('audio', {
            //         autoplay: '1',
            //         id: 'localAudio' + i,
            //         muted: false
            //     });
            //     container.current?.append(audio);
            //     localTracks[i].attach(audio);
            // }
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
            const video = createDOM('video', {
                autoplay: '1',
                id: participant + 'video',
                width: 450,
                height: 300
            });
            container.current?.append(video);
            console.log(videoArray.current)
            for (let i = 0; i < videoArray.current.length; i++) {
                if (videoArray.current[i]) {
                    document.getElementById("screen" + i).setAttribute("src", "#" + participant + 'video');
                    videoArray.current[i] = false;
                    break;
                }
            }
            track.attach(video);
        } else {
            cleanupDOM(participant + 'audio');
            const audio = createDOM('audio', {
                autoplay: '1',
                id: participant + 'audio'
            });
            container.current?.append(audio);
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
        console.log('disconnect');
        connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,onConnectionSuccess);
        connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,onConnectionFailed);
        connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,disconnect);

        for (let i = 0; i < localTracks.length; i++) {
            localTracks[i].dispose();
        }

        return await connection.disconnect();
    };

    const createADOM = id => {
        console.log(id);
        console.log(aframe.registerComponent);
        // aframe.registerComponent('init', {
        //     init: function(){
        //         console.log(this);
        //     },
        // });
        const avatarEl = document.createElement('a-box');
        // avatarEl.setAttribute('init', '');
        avatarEl.setAttribute('position', {x: 0, y: 0, z: 0});
        avatarEl.setAttribute('id', id);
        console.log(avatarEl);
        console.log(scene.current);
        scene.current.el.appendChild(avatarEl);
    };

    const onUserJoined = id => {
        console.log(`User ${id} Joined!`);
        if(!participantIds.has(id)){
            participantIds.add(id);
            createADOM(id);
        }
    };

    const onUserLeft = id => {
        console.log(`User ${id} left!`);
        cleanupDOM(id + "video");
        cleanupDOM(id + "audio");
        delete remoteTracks[id];
        participantIds.delete(id);
        const aVideoSets = document.getElementsByTagName("a-video");
        console.log(aVideoSets);
        for (const i in aVideoSets) {
            if (aVideoSets[i].getAttribute("src") === `#${id}video`) {
                console.log(aVideoSets[i]);
                aVideoSets[i].setAttribute("src", "#video");
                videoArray.current[i] = true;
                break;
            }
        }
    };

    const onConnectionSuccess = () => {
        console.log('connect seccuess');
        room = connection.initJitsiConference(searchParams.get('room'), {});
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
        room.on(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, getPosition);
        room.join();
        createADOM();
    };

    const connect = async () => {
        JitsiMeetJS.init();
        connection = new JitsiMeetJS.JitsiConnection(null, token, buildOptions());
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
        Object.values(remoteTracks).forEach(tracks => {
            for (const track of tracks) {
                for (const t of track.containers) {
                    t.remove();
                }
            }
        })
    };

    const sendPosition = (id, x, y) => {
        console.log(`${id}, ${x}, ${y}`);
        room.sendEndpointStatsMessage({
            type: "position",
            id,
            x,
            y
        });
    };

    const getPosition = (p) => {
        console.log(p);
    }

    useEffect(() => {
        connect();
        videoArray.current = new Array(document.getElementsByTagName("a-video").length - 1).fill(true);
        camera.current?.el.setAttribute('read-position', '');

        return () => hangup();
    }, []);

    return (
        <div>
            <Scene ref={scene}>
                {/* <a-sky src={sky} radius="15" shadow="receive: true"></a-sky> */}
                <Entity primitive="a-sky" radius="15" shadow="receive: true" src="aframe/sky.jpg"/>
                <Entity primitive="a-plane" src={floor} repeat=" 60 60" rotation="-90 0 0" scale="25 25 1" shadow="receive: true" static-body />
                <a-entity progressive-controls></a-entity>

                {/* <!--movement--> */}
                <a-entity id="cam-rig" position="0 0 4">
                    <Entity ref={camera} primitive="a-camera" id="head" user-height="1.6">
                        <a-cursor></a-cursor>
                        <a-box id="add-button" position="0 1 -1" color="red" width="0.5" height="0.5" depth="0.1"></a-box>
                    </Entity>
                </a-entity>

                <a-box data-brackets-id="514" color="#AA0000" depth="0.2" height="0.7" width="5" material="" geometry="" position="-1.0 0.35 1.5"></a-box>
                <a-box color="#AA0000" depth="2.4" height="0.1" width="5.5" position="-1.0 0.73905 1.5"></a-box>
                
                {/* <!--environment light--> */}
                <a-assets id="asset-container" ref={container}>
                    <video id="video" />
                    <img id="c" src="aframe/C.jpg" />
                </a-assets>

                <a-video id="localScreen" data-brackets-id="644" src="aframe/#video" position="-3.5 1.12 1.5" material="" geometry="width: 0.8; height: 0.47" rotation="30 90 0" />
                <a-video id="screen0" data-brackets-id="644" src="aframe/#video" position="3.5 2 2.7" material="" geometry="width: 2; height: 1.5; segmentsWidth: 2" rotation="0 90 0" />
                <a-video id="screen1" data-brackets-id="644" src="aframe/#video" position="3.5 2 0.4" material="" geometry="width: 2.3; height: 1.5" rotation="0 90 0" />
                <a-video id="screen2" data-brackets-id="644" src="aframe/#video" position="3.1 2 4.5" material="" geometry="width: 1.6; height: 1.5" rotation="0 60 0" />
                <a-video id="screen3" data-brackets-id="644" src="aframe/#video" position="3.1 2 -1.55" material="" geometry="width: 1.6; height: 1.5" rotation="0 120 0" />

                {/* <!--radio--> */}
                <a-entity data-brackets-id="327" id="yellow" gltf-model="aframe/radio/scene.gltf" position="9.11851 0.45804 -7.96256" sound="src: mpi,Benjamin%20-%20Inferno.mp3" scale="0.2 0.2 0.2" rotation="0 17.71 0">
                    <a-sphere data-brackets-id="328" color="#00AA00" radius="0.2" position="-0.5 0.93319 0" play="" material="" geometry=""></a-sphere>
                    <a-sphere data-brackets-id="329" color="#AA0000" radius="0.2" position="0.5 1 0" stop="" material="" geometry=""></a-sphere>
                </a-entity>
                <a-box color="yellow" height="0.422" width="0.39" depth="0.75" position="9.11054 0.25999 -7.98199" data-brackets-id="440" ></a-box>

                {/* <!--celling--> */}
                <a-box color="white" height="1" width="20" depth="20" position="0 4.5 0"></a-box>
                {/* <!--wall--> */}
                <a-box data-brackets-id="600" color="white" position="9.9 2 0" material="" geometry="height: 4; width: 0.2; depth: 20"></a-box>
                <a-box data-brackets-id="627" color="white" position="0 2 -9.9" material="" geometry="height:4; width: 20; depth: 0.2"></a-box>
                <a-box data-brackets-id="845" color="white" position="7.3 2 7.5" material="" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity data-brackets-id="1806" gltf-model="aframe/window/scene.gltf" position="3.82 -1.0 7.7" scale="0.04 0.074 0.04" rotation="0 60 0"></a-entity>
                <a-box data-brackets-id="845" color="white" position="-7.3 2 7.5" material="" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity data-brackets-id="1808" gltf-model="aframe/window/scene.gltf" position="-3.86296 -1.0 7.7" scale="0.04 0.073 0.04" rotation="0 60 0"></a-entity>
                <a-box data-brackets-id="1083" color="white" position="0.04123 2 7.5" material="" geometry="height: 4; width: 5.82; depth: 0.2"></a-box>
                <a-box data-brackets-id="1637" color="white" position="-3.83305 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>
                <a-box data-brackets-id="1637" color="white" position="3.89924 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>

                <a-box data-brackets-id="303" color="white" position="-9.9 2 -5.01609" material="" geometry="height: 4; width: 0.2; depth: 9.94"></a-box>

                <a-entity data-brackets-id="3153" gltf-model="aframe/sliding_window/scene.gltf" position="-9.93211 1 0.44978" scale="0.0106 0.021 0.03" rotation="0 -90 0"></a-entity>
                <a-box data-brackets-id="1062" color="white" position="-9.9 3.36514 0.45838" material="" geometry="width: 0.2; height: 1.29; depth: 1.03"></a-box>
                <a-box data-brackets-id="1138" color="white" position="-9.9 3.37736 5.46013" material="" geometry="width: 0.2; height: 1.28; depth: 1.02"></a-box>
                <a-box data-brackets-id="1062" color="white" position="-9.9 0.50597 0.45838" material="" geometry="width: 0.2; depth: 1.03"></a-box>
                <a-box data-brackets-id="808" color="white" position="-9.9 0.47759 5.4519" material="" geometry="width: 0.2; depth: 1.02"></a-box>

                <a-box data-brackets-id="3234" geometry="depth: 4; height: 4; width: 0.2" color="white" position="-9.9 2 2.95027" ></a-box>
                <a-entity data-brackets-id="3224" gltf-model="aframe/sliding_window/scene.gltf" position="-9.93211 1 5.46438" scale="0.011 0.021 0.03" rotation="0 -90 0"></a-entity>
                <a-box data-brackets-id="3234" geometry="depth: 4.06; height: 4; width: 0.2" color="white" position="-9.9 2 7.96626" ></a-box>
                {/* <!--lamp--> */}
                {/* <a-entity gltf-model="aframe/Unity2Skfb/Unity2Skfb.gltf" position="3 3 3"></a-entity> */}
                {/* <a-entity data-brackets-id="807" gltf-model="aframe/Unity2Skfb/Unity2Skfb.gltf" position="8 2 9"></a-entity> */}
                <a-box id="box" height="3" depth="5" width="0.1" color="#green" position="4.13734 1.5 1.5" geometry="" material=""></a-box>
                {/* <a-entity data-brackets-id="1132" light="type: spot; target: #box; color: #C40070; angle: 20; shadowCameraFov: 1" position="8 4 9"> */}
                {/* </a-entity> */}
                {/* <!--photoframe--> */}

                <a-entity data-brackets-id="70" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="0.52 3.041 -9.8" rotation="0 -90 0" scale="1 0.8 1.7"></a-entity>
                <a-entity data-brackets-id="67" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.464 2.3 -9.8" rotation="0 -90 0" scale="1 0.9 1.5"></a-entity>
                <a-entity data-brackets-id="32" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="0.51 1.85 -9.8" rotation="0 -90 0" scale="1 2 1.7"></a-entity>
                <a-entity data-brackets-id="68" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.31 1.46 -9.8" rotation="0 -90 0"></a-entity>
                <a-entity data-brackets-id="71" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.95 1.45 -9.8" rotation="0 -90 0"></a-entity>
                <a-entity data-brackets-id="69" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="1.35 2.24 -9.8" rotation="0 -90 0" scale=""></a-entity>
                <a-entity data-brackets-id="72" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="1.44 1.42 -9.8" rotation="0 -90 0" scale="1 0.9 1.3"></a-entity>


                <a-image  position="0.51 1.85 -9.78" scale="0.91 1.47 1"></a-image>
                <a-image src="aframe/Q.jpg" position="-0.464 2.3 -9.78" scale="0.76 0.66 1"></a-image>
                <a-image src="aframe/tooopen.jpg" position="0.52 3.041 -9.78" scale="0.84 0.58 1"></a-image>
                <a-image src="aframe/R.jpg" position="-0.95 1.45 -9.78" scale="0.51 0.72 1"></a-image>
                <a-image src="aframe/C.jpg" position="-0.31 1.46 -9.78" scale="0.5 0.75 1"></a-image>
                <a-image src="aframe/a.jpg" position="1.35 2.24 -9.78" scale="0.49 0.74 1"></a-image>
                <a-image src="aframe/b.jpg" position="1.44 1.42 -9.78" scale="0.64 0.66 1"></a-image>
                {/* <!--room--> */}
                <a-entity data-brackets-id="772" gltf-model="aframe/glass_door/scene.gltf" position="-5.5 0.02 -3.8" scale="0.01 0.011 0.01"></a-entity>
                <a-box data-brackets-id="955" color="#FFFFFF" height="5.5" depth="0.2" weight="4.28" position="-7.65372 2. -3.7" material="" geometry="height: 4.05; depth: 0.2; width: 4.28"></a-box>
                <a-box data-brackets-id="96" color="#FFFFFF" position="-0.03 2 -3.7" material="" geometry="height: 4.05; depth: 0.2; width: 9" dynamic-body></a-box>

                <a-box data-brackets-id="1129" color="#FFFFFF" height="5.5" depth="0.2" weight="4.28" position="7.67986 2 -3.7" material="" geometry="height: 4.05; width: 4.28"></a-box>
                <a-entity data-brackets-id="1128" gltf-model="aframe/glass_door/scene.gltf" position="4.4801 0.02 -3.8" scale="0.011 0.011 0.01"></a-entity>

                <a-box data-brackets-id="744" color="#FFFFF" position="-5.02477 3.16332 -3.7" material="" geometry="height: 1.68; width: 1 ;depth:0.2"></a-box>
                <a-box data-brackets-id="1131" color="#FFFFF" position="5.00702 3.16332 -3.7" material="" geometry="height: 1.68; width: 1.1; depth:0.2"></a-box>

                <a-entity data-brackets-id="1560" gltf-model="aframe/indoor_plant/scene.gltf" position="9.45593 0.03259 -4.206" scale="0.2 0.2 0.2"></a-entity>

                <a-entity data-brackets-id="1869" gltf-model={{src: 'src/assets/sofa/scene.gltf'}} position="9.26173 0.02537 -5.98061" scale="0.01 0.01 0.01"></a-entity>
                <a-entity data-brackets-id="1868" gltf-model="aframe/indoor_plant/scene.gltf" position="3.89412 0.03259 -4.206" scale="0.2 0.2 0.2"></a-entity>
                {/* <!--roomlamp--> */}
                <a-entity data-brackets-id="4334" gltf-model="aframe/moon_lamp/scene.gltf" position="2 2 -3.78" scale="0.05 0.05 0.05" rotation="-90 0 0"></a-entity>
                <a-entity data-brackets-id="5699" light="type: spot; intensity: 0.5; distance: 4; angle: 360; penumbra: 0.25; " position="2 2 -4.73" shadow="" ></a-entity>

                <a-entity data-brackets-id="4334" gltf-model="aframe/moon_lamp/scene.gltf" position="-2 2 -3.78" scale="0.05 0.05 0.05" rotation="-90 0 0"></a-entity>
                <a-entity data-brackets-id="4766" light="type: spot; intensity: 0.5; distance: 4; angle: 360; penumbra: 0.25" position="-2 2 -4.73" shadow=""></a-entity>

                {/* <!--Pendant Light--> */}
                <a-entity gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="0 3.1 0"></a-entity>
                <a-entity data-brackets-id="5699" light="type: spot; intensity: 0.7; distance: 8.82; angle: 50; penumbra: 0.25; " position="0 3.58 0" shadow="" rotation="-90 0 0"></a-entity>


                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="4 3.1 0"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="4 3.2 0" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="-4 3.1 0"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="-4 3.2 0" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="-8 3.1 0"></a-entity>
                <a-entity light="type: point; intensity: 0.6; distance: 9" position="-8 3.2 0" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="8 3.1 0"></a-entity>
                <a-entity light="type: point; intensity: 0.6; distance: 9" position="8 3.2 0" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="0 3.1 5.5"></a-entity>
                <a-entity light="type: point; intensity: 0.6; distance: 9" position="0 3.2 5.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/Lamp/Unity2Skfb.gltf" scale="0.7 0.7 0.7" position="0 1.8 -6.5"></a-entity>
                <a-entity data-brackets-id="5699" light="type: spot; intensity: 1; distance: 8.82; angle: 50; penumbra: 0.25; " position="0 3.2 -6.5" shadow="" rotation="-90 0 0"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="4 3.1 5.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="4 3.2 5.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/Lamp/Unity2Skfb.gltf" scale="0.7 0.7 0.7" position="4 1.8 -6.5"></a-entity>
                <a-entity data-brackets-id="5699" light="type: spot; intensity: 1; distance: 8.82; angle: 50; penumbra: 0.25; " position="3.8 3.2 -6.5" shadow="" rotation="-90 0 0"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="-4 3.1 5.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="-4 3.2 5.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/Lamp/Unity2Skfb.gltf" scale="0.7 0.7 0.7" position="-4 1.8 -6.5"></a-entity>
                <a-entity data-brackets-id="2534" light="type: spot; distance: 8.82; angle: 50; penumbra: 0.25" position="-3.8 3.2 -6.6" shadow="" rotation="-90 0 0"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="-8 3.1 -6.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 10" position="-8 3.2 -6.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="8 3.1 -6.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 10" position="8 3.2 -6.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="8 3.1 5.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="8 3.2 5.5" shadow="true"></a-entity>

                <a-entity data-brackets-id="21" gltf-model="aframe/temple_pendant_light_and_002_plumen_bulb_brass/scene.gltf" scale="0.008 0.008 0.008" position="-8 3.1 5.5"></a-entity>
                <a-entity data-brackets-id="154" light="type: point; intensity: 0.6; distance: 9" position="-8 3.2 5.5" shadow="true"></a-entity>
                {/* <!--chair--> */}
                {/* <!--right--> */}
                <a-entity data-brackets-id="337" gltf-model="aframe/chair/scene.gltf" position="0.9 0 2.5" rotation="0 0 0" scale="0.7 0.7 0.7" ></a-entity>
                <a-entity data-brackets-id="980" gltf-model="aframe/chair/scene.gltf" position="-0.7 0 2.5" rotation="" scale="0.7 0.7 0.7"></a-entity>
                <a-entity data-brackets-id="981" gltf-model="aframe/chair/scene.gltf" position="-2.3 0 2.5" rotation="" scale="0.7 0.7 0.7"></a-entity>

                {/* <!--left--> */}
                <a-entity data-brackets-id="507" gltf-model="aframe/chair/scene.gltf" position="0.3 0 0.5" rotation="0 180 0" scale="0.7 0.7 0.7"></a-entity>
                <a-entity data-brackets-id="983" gltf-model="aframe/chair/scene.gltf" position="-1.3 0 0.5" rotation="0 180 0" scale="0.7 0.7 0.7"></a-entity>
                <a-entity data-brackets-id="987" gltf-model="aframe/chair/scene.gltf" position="-2.9 0 0.5" rotation="0 180 0" scale="0.7 0.7 0.7"></a-entity>
                {/* <!--coffeecup--> */}

                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="1.0 0.8 2.45" scale="0.25 0.25 0.25" ></a-entity>
                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="-0.5 0.8 2.45" scale="0.25 0.25 0.25"></a-entity>
                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="-2.2 0.8 2.45" scale="0.25 0.25 0.25"></a-entity>
                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="1.0 0.8 0.55" scale="0.25 0.25 0.25"></a-entity>
                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="-0.5 0.8 0.55" scale="0.25 0.25 0.25"></a-entity>
                <a-entity data-brackets-id="203" gltf-model="aframe/coffee_shop_cup/scene.gltf" position="-2.2 0.8 0.55" scale="0.25 0.25 0.25"></a-entity>
                {/* <!--screen--> */}

                {/* <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="0.4 0.79 2.25" scale="0.005 0.005 0.005" rotation="0 206 0"></a-entity>
                <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="-1.2 0.79 2.25" scale="0.005 0.005 0.005" rotation="0 206 0"></a-entity>
                <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="-2.8 0.79 2.25" scale="0.005 0.005 0.005" rotation="0 206 0"></a-entity>
                <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="-2.36 0.79 0.68" scale="0.005 0.005 0.005" rotation="0 25.76 0"></a-entity>
                <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="-0.76 0.79 0.68" scale="0.005 0.005 0.005" rotation="0 25.76 0"></a-entity>
                <a-entity data-brackets-id="743" gltf-model="aframe/benq_screen/scene.gltf" position="0.84 0.79 0.68" scale="0.005 0.005 0.005" rotation="0 25.76 0"></a-entity>
                */}
            </Scene>


        </div>
    );
}
//};

export default WebXR;