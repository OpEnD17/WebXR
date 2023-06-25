import { createDOM, cleanupDOM, throttle } from "../../tool/tools.ts";
import useConnect from "../../hooks/useConnect.js";
import Avatar from "../../component/avatar/index.jsx";
import Pointer from "../../component/pointer/index.jsx";

import "./index.css";

import floor from "../../assets/image/floor.png";
import face1 from "../../assets/image/face1.png";
import face2 from "../../assets/image/face2.png";
import face3 from "../../assets/image/face3.png";
import face4 from "../../assets/image/face4.png";
import face5 from "../../assets/image/face5.png";
import face6 from "../../assets/image/face6.png";
import face7 from "../../assets/image/face7.png";
import face8 from "../../assets/image/face8.png";
import face9 from "../../assets/image/face9.png";

import "aframe";
import { useNavigate } from "react-router";
import { Entity, Scene } from "aframe-react";
import React, { useEffect, useRef, useState } from "react";
require('aframe-look-at-component');

const A = window.AFRAME;
const JitsiMeetJS = window.JitsiMeetJS;
const conf = JitsiMeetJS.events.conference;
const conn = JitsiMeetJS.events.connection;
//add eventlistener(play music) to yellow box
A.registerComponent('play', {
    init: function () {
        var myEL = document.querySelector("#yellow");
        this.el.addEventListener('click', function () {
            myEL.components.sound.playSound();
        });
    }
});
//add eventlistener(stop music) to yellow box
A.registerComponent('stop', {
    init: function () {
        var myEL = document.querySelector("#yellow");
        this.el.addEventListener('click', function () {
            myEL.components.sound.stopSound();
        });
    }
});

A.registerComponent('showtext', {
    init: function () {
        const introText = document.querySelector("#introText");
        //const Text1 = document.querySelector("#v-mtext");
        this.el.addEventListener('click', function () {
            //Text1.setAttribute("visible",!Text1.getAttribute('visible'));
            introText.setAttribute("visible", !introText.getAttribute('visible'));
        })
    }
});

//add eventlistener(textmessage) to vending machine
A.registerComponent('showtext1', {
    init: function () {
        const Text1 = document.querySelector("#v-mtext1");
        this.el.addEventListener('click', function () {
            Text1.setAttribute("visible", !Text1.getAttribute('visible'));
        })
    }
});

//add eventlistener(textmessage) to vending machine
A.registerComponent('showtext2', {
    init: function () {
        const Text2 = document.querySelector("#v-mtext2");
        this.el.addEventListener('click', function () {
            Text2.setAttribute("visible", !Text2.getAttribute('visible'));
        })
    }
});
//add false to visible attribute on welcome message
A.registerComponent('show', {
    init: function () {
        const introText = document.querySelector("#welcome");
        this.el.addEventListener('click', function () {
            introText.setAttribute("visible", false);
        })
    }
});
//add eventlistener(open and close door funciton) to the left door 
A.registerComponent('openl', {
    init: function () {
        const turn = document.querySelector('#rotingl');
        let isOpen = false;
        this.el.addEventListener('click', function () {
            if (isOpen) {
                turn.setAttribute('rotation', "0 0 0")
                isOpen = false;
            } else {
                turn.setAttribute('rotation', "0 90 0");
                isOpen = true;
            }
        })
    }
});
//add eventlistener(open and close door funciton) to the right door 
A.registerComponent('openr', {
    init: function () {
        const turn = document.querySelector('#rotingr');
        let isOpen = false;
        this.el.addEventListener('click', function () {
            if (isOpen) {
                turn.setAttribute('rotation', "0 0 0")
                isOpen = false;
            } else {
                turn.setAttribute('rotation', "0 -90 0");
                isOpen = true;
            }
        })
    }
});

const WebXR = () => {

    const [connection, room] = useConnect();
    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState({});
    const [pointers, setPointers] = useState({});

    const navigate = useNavigate();

    const localTracks = useRef([]);
    const remoteTracks = useRef({});
    const registered = useRef(false);
    // px = X position, rx = X rotation, 
    // info = [px, pz, rx, ry, rz]
    const info = useRef([0, 0, 0, 0, 0]);

    const assetsRef = useRef(null);
    const floorRef = useRef(null);
    const rigRef = useRef(null);
    const camRef = useRef(null);

    // registerComponent can only be called once, so write them inside useEffect
    useEffect(() => {
        if (!registered.current && room) {

            // send position of the camera every second
            A.registerComponent('send-pos', {
                tick: throttle(function () {
                    const rigPos = rigRef.current.el.object3D.position;
                    const position = this.el.object3D.position;
                    const rotation = this.el.getAttribute('rotation');
                    if (rigPos.x !== info.current[0]
                        || rigPos.z !== info.current[1]
                        || rotation.x !== info.current[2]
                        || rotation.y !== info.current[3]
                        || rotation.z !== info.current[4]) {
                        info.current[0] = rigPos.x + position.x;
                        info.current[1] = rigPos.z + position.z;
                        info.current[2] = rotation.x;
                        info.current[3] = rotation.y;
                        info.current[4] = rotation.z;
                        sendInfo('pos', {
                            x: rigPos.x + position.x,
                            z: rigPos.z + position.z,
                            rx: -rotation.x,
                            ry: rotation.y + 180,
                            rz: -rotation.z
                        });
                    }
                }, 1000)
            });

            // Add event listeners to all elements with pointable attribute.
            // when mouse down, get the position of the intersection point and update.
            for (const el of document.getElementsByClassName('pointable')) {
                el.addEventListener('mousedown', e => {
                    const point = e.detail.intersection.point;
                    const id = room.myUserId();
                    setPointers(pointers => ({ ...pointers, [id]: point }));
                    sendInfo('pointerPos', point);
                });
            }

            // Add event listeners to the floor
            // get the position of the rig and relative position of the camera
            floorRef.current.addEventListener('mouseup', e => {
                const point = e.detail.intersection.point;
                const camPos = camRef.current.el.object3D.position;
                const rig = rigRef.current.el;
                rig.setAttribute('position', { x: point.x - camPos.x, y: point.y, z: point.z - camPos.z });
                const pos = rig.object3D.position;
                const rotation = rig.getAttribute('rotation');
                info.current[0] = pos.x - camPos.x;
                info.current[1] = pos.z - camPos.z;
                info.current[2] = rotation.x;
                info.current[3] = rotation.y;
                info.current[4] = rotation.z;
                sendInfo('pos', {
                    x: pos.x - camPos.x,
                    z: pos.z - camPos.z,
                    rx: -rotation.x,
                    ry: rotation.y + 180,
                    rz: -rotation.z
                });
            });

            registered.current = true;
        }
    }, [room]);

    // when received local tracks, add them to localTracks ref.
    const onLocalTracks = tracks => {
        for (const track of tracks) {
            localTracks.current.push(track);
        }
    };

    // when received remote tracks, 
    // add them to remoteTracks ref and add video and audio to assets container.
    const onRemoteTrack = track => {
        if (track.isLocal()) {
            return;
        }

        const participantId = track.getParticipantId();
        if (track.getType() === 'audio') {
            remoteTracks.current[participantId][0] = track;
        }
        else {
            remoteTracks.current[participantId][1] = track;
        }

        if (track.getType() === 'video') {
            cleanupDOM(participantId + 'video');
            const video = createDOM('video', {
                autoplay: '1',
                id: participantId + 'video',
            });
            assetsRef.current?.append(video);
            track.attach(video);
        } else {
            cleanupDOM(participantId + 'audio');
            const audio = createDOM('audio', {
                autoplay: '1',
                id: participantId + 'audio'
            });
            assetsRef.current?.append(audio);
            track.attach(audio);
        }
    };

    // when conference joined, add local tracks to the room.
    const onConferenceJoined = () => {
        console.log('conference joined!');
        for (const track of localTracks.current) {
            room.addTrack(track);
        }
    };

    const onConnectionFailed = () => {
        alert('connect failed');
        console.log('connect failed');
    };

    const disconnect = async () => {
        console.log('disconnect');
        connection?.removeEventListener(conn.CONNECTION_ESTABLISHED, onConnectionSuccess);
        connection?.removeEventListener(conn.CONNECTION_FAILED, onConnectionFailed);
        connection?.removeEventListener(conn.CONNECTION_DISCONNECTED, disconnect);
        for (let i = 0; i < localTracks.current.length; i++) {
            localTracks.current[i].dispose();
        }
        return await connection?.disconnect();
    };

    // when user joined
    const onUserJoined = id => {
        console.log(`User ${id} Joined!`);
        users[id] = [0, 0, 0, 0, 0, id.substr(0, 6)];
        remoteTracks.current[id] = [null, null];
        setUsers({ ...users });
    };

    // when users left, delete their avatars and pointers.
    const onUserLeft = id => {
        console.log(`User ${id} left!`);
        delete users[id];
        delete pointers[id];
        setUsers(({ ...users }));
        setPointers({ ...pointers });
    };

    // when received a message, do something according to the type.
    const onMessageReceived = (r, data) => {
        switch (data.type) {
            case "pos":
                if (users[r._id][0] === data.x
                    && users[r._id][1] === data.z
                    && users[r._id][2] === data.rx
                    && users[r._id][3] === data.ry
                    && users[r._id][4] === data.rz) {
                    return;
                }
                users[r._id] = [data.x, data.z, data.rx, data.ry, data.rz, r._id.substr(0, 6)];
                setUsers({ ...users });
                break;
            case 'pointerPos':
                if (data.x == null) {
                    setPointers(pointers => ({ ...pointers, [r._id]: null }));
                }
                else {
                    setPointers(pointers => ({ ...pointers, [r._id]: { x: data.x, y: data.y, z: data.z } }));
                }
                break
            default:
                break;
        }
    };

    // when connection established, add event listener to room.
    const onConnectionSuccess = () => {
        setConnected(true);
        room.on(conf.TRACK_ADDED, onRemoteTrack);
        room.on(conf.TRACK_REMOVED, track => { console.log(`track ${track} removed!`) });
        room.on(conf.CONFERENCE_JOINED, onConferenceJoined);
        room.on(conf.USER_JOINED, onUserJoined);
        room.on(conf.USER_LEFT, onUserLeft);
        room.on(conf.ENDPOINT_MESSAGE_RECEIVED, onMessageReceived);
        room.join();
    };

    // send message to all other participants.
    const sendInfo = (type, info) => {
        switch (type) {
            case 'pos':
                room.sendMessage({
                    type: 'pos',
                    x: info.x,
                    z: info.z,
                    rx: info.rx,
                    ry: info.ry,
                    rz: info.rz
                });
                break;
            case 'pointerPos':
                room.sendMessage({
                    type: 'pointerPos',
                    x: info?.x,
                    y: info?.y,
                    z: info?.z
                });
                break;
            default:
                break;
        }
    };

    const connect = async () => {

        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

        // create local tracks
        let flag = false;
        await navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                flag = true
            }, () => {
                alert('Camera not available!');
            });

        const tracks = flag
            ? await JitsiMeetJS.createLocalTracks({
                devices: ['audio', 'video']
            })
            : await JitsiMeetJS.createLocalTracks({
                devices: ['audio']
            });

        onLocalTracks(tracks);
        connection.addEventListener(conn.CONNECTION_ESTABLISHED, () => setConnected(true));
        connection.addEventListener(conn.CONNECTION_FAILED, onConnectionFailed);
        connection.addEventListener(conn.CONNECTION_DISCONNECTED, disconnect);
        connection.connect();
    };

    const hangup = async () => {
        removeRemoteTracks();
        room && await room.leave();
        await disconnect();
        navigate('/');
        window.location.reload();
    };

    const removeRemoteTracks = () => {
        Object.values(remoteTracks.current).forEach(tracks => {
            for (const track of tracks) {
                for (const t of track.containers) {
                    t.remove();
                }
            }
        });
    };

    const onRemovePointer = id => {
        // id: int
        // room.myUserId: string
        // can not use '===' here!
        if (id == room.myUserId()) {
            sendInfo('pointerPos', null);
            setPointers(pointers => ({ ...pointers, [id]: null }));
        }
    };

    useEffect(() => {
        if (connected) {
            onConnectionSuccess();
        }
    }, [connected]);

    useEffect(() => {
        if (connection) {
            connect();
        }
    }, [connection]);

    return (
        <div>
            <Scene id='scene' vr-mode-ui="enterVRButton: #enterVRButton">
                {/* <!--enter VR button--> */}
                <div id="VRButtons">
                    <div id="enterVRButton">Enter VR Mode</div>
                    <div id="hangupButton" onClick={hangup}>Hang up</div>
                </div>
                <a-entity light="type:ambient"></a-entity>
                <Entity primitive="a-sky" radius="40" shadow="receive: true" src="aframe/sky.jpg" />
                <a-plane
                    raycaster="object: .clickable"
                    clickable id='floor'
                    ref={floorRef}
                    src={floor}
                    repeat="10 10"
                    rotation="-90 0 0"
                    scale="25 25 1"
                />

                {/* <!--movement--> */}
                <Entity id='cameraRig' ref={rigRef} >
                    <Entity
                        ref={camRef}
                        id='camera'
                        primitive="a-camera"
                        user-height="1.6"
                        send-pos
                        wasd-controls-enabled="true"
                        look-controls="pointerLockEnabled:true"
                    >
                        <Entity
                            primitive="a-cursor"
                            cursor={{ fuse: false }}
                            material={{ color: 'black', shader: 'flat' }}
                            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
                        />
                    </Entity>
                    <a-entity id='righthand' laser-controls="hand: right"></a-entity>
                </Entity>

                <a-box data-brackets-id="514" color="#AA0000" depth="0.2" height="0.7" width="5" position="-1.0 0.35 1.5"></a-box>
                <a-box color="#AA0000" depth="2.4" height="0.1" width="5.5" position="-1.0 0.73905 1.5"></a-box>

                {/* map users and pointers to render Avatars and Pointers */}
                {
                    Object.keys(users).map(id => {
                        return id !== "me"
                            && <Avatar
                                key={id}
                                id={id}
                                info={users[id]}
                                track={(remoteTracks.current[id] && remoteTracks.current[id][1] != null) ? true : false}
                            />
                    })
                }

                {
                    Object.keys(pointers).map(id => {
                        return pointers[id] !== null
                            && <Pointer key={"pointer" + id} color={id} pos={pointers[id]} onclick={onRemovePointer} />
                    })
                }

                <a-assets id="asset-container" ref={assetsRef}>
                    <image id="face1" src={face1} />
                    <image id="face2" src={face2} />
                    <image id="face3" src={face3} />
                    <image id="face4" src={face4} />
                    <image id="face5" src={face5} />
                    <image id="face6" src={face6} />
                    <image id="face7" src={face7} />
                    <image id="face8" src={face8} />
                    <image id="face9" src={face9} />
                </a-assets>

                {/* <!--radio--> */}
                <a-entity
                    data-brackets-id="327"
                    id="yellow"
                    gltf-model="aframe/radio/scene.gltf"
                    position="9.11851 0.45804 -7.96256"
                    sound="src: mpi,Benjamin%20-%20Inferno.mp3"
                    scale="0.2 0.2 0.2"
                    rotation="0 17.71 0"
                >
                    <a-sphere
                        data-brackets-id="328"
                        color="#00AA00" radius="0.2"
                        position="-0.5 0.93319 0"
                        play
                        animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 1.2 1.2 1.2"
                        animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 1 1 1"
                    >
                    </a-sphere>
                    <a-sphere
                        data-brackets-id="329"
                        color="#AA0000"
                        radius="0.2"
                        position="0.5 1 0"
                        stop
                        animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 1.2 1.2 1.2"
                        animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 1 1 1"></a-sphere>
                </a-entity>
                <a-box color="yellow"
                    height="0.422" width="0.39" depth="0.75"
                    position="9. 0.26 -7.98"
                    data-brackets-id="440"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 1.2 1.2 1.2"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 1 1 1"
                    showtext>
                </a-box>

                {/* <!--baseboard--> */}
                <a-box color="#551F06" position="9.78 0.03 -1.14" material="" geometry="depth: 17.3; height: 0.14; width: 0.02"></a-box>
                <a-box color="#551F06" position="-9.8 0.03 -1.14" material="" geometry="depth: 17.3; height: 0.14; width: 0.02"></a-box>
                <a-box color="#551F06" position="0 0.03 -9.8" geometry="depth: 0.02; height: 0.14; width: 19.6" ></a-box>
                <a-box color="#551F06" position="9.78 3.89 -1.14" material="" geometry="depth: 17.3; height: 0.14; width: 0.02"></a-box>
                <a-box color="#551F06" position="0 3.89 7.34925" geometry="depth: 0.02; height: 0.14; width: 19.6" ></a-box>
                <a-box color="#551F06" position="0 3.89 -9.8" geometry="depth: 0.02; height: 0.14; width: 19.6" ></a-box>
                <a-box color="#551F06" position="-9.8 3.89 -1.14" material="" geometry="depth: 17.3; height: 0.14; width: 0.02"></a-box>
                <a-box color="#551F06" position="9.78 1.99 7.37" geometry="depth: 0.1; height: 3.8; width: 0.02" ></a-box>
                <a-box color="#551F06" position="9.78 1.99 -9.77" geometry="depth: 0.1; height: 3.8; width: 0.02" ></a-box>
                <a-box color="#551F06" position="-9.78 1.99 -9.77" geometry="depth: 0.1; height: 3.8; width: 0.02" ></a-box>
                <a-box color="#551F06" position="-9.78 1.99 7.37" geometry="depth: 0.1; height: 3.8; width: 0.02" ></a-box>
                {/* <!--fence--> */}
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="-7.01957 0.01 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="-4.01957 0.01001 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="-1.01957 0.01001 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="2.01957 0.01001 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="5.01957 0.01001 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="8.01957 0.01001 13" scale="1 2 2" rotation="0 90 0"></a-entity>
                <a-entity id="fence" gltf-model="aframe/fence/scene.gltf" position="9.61447 0.01001 13" scale="1 2 1" rotation="0 90 0"></a-entity>

                {/* <!--wall--> */}
                <a-box class="pointable" color="#DAD5D4" position="9.9 2 0" geometry="height: 4; width: 0.2; depth: 20" ></a-box>
                <a-box class="pointable" data-brackets-id="627" color="#DAD5D4" position="0 2 -9.9" geometry="height:4; width: 20; depth: 0.2"></a-box>
                <a-box data-brackets-id="845" color="#DAD5D4" position="7.3 2 7.5" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity class="pointable" data-brackets-id="1806" gltf-model="aframe/window/scene.gltf" position="3.82 -1.1 7.7" scale="0.04 0.074 0.04" rotation="0 60 0"></a-entity>
                <a-box class="pointable" data-brackets-id="845" color="#DAD5D4" position="-7.3 2 7.5" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity class="pointable" data-brackets-id="1808" gltf-model="aframe/window/scene.gltf" position="-3.86296 -1.0 7.7" scale="0.04 0.073 0.04" rotation="0 60 0" ></a-entity>
                <a-box position="9.9 2 11.5" color="#DAD5D4" geometry="height: 4; width: 0.2; depth: 3" ></a-box>
                <a-box position="-9.9 2 11.5" color="#DAD5D4" geometry="height: 4; width: 0.2; depth: 3" ></a-box>
                <a-box position="0 0 12.99789" color="#DAD5D4" geometry="height: 0.01; width: 20" ></a-box>
                <a-box position="-0.144 3.32 7.48" color="#DAD5D4" geometry="width: 4; depth: 0.2" ></a-box>
                {/* <!--opendoor--> */}
                <a-box color="#DAD5D4" position="2.43 2 7.5" geometry="height: 4; width: 1; depth: 0.2"></a-box>
                <a-box color="#DAD5D4" position="-2.39 2 7.5" geometry="height: 4; width: 1; depth: 0.2"></a-box>
                <a-box id="rotingl" openl color="#DAD5D4" position="1.829 2 7.5" geometry="height: 4; width: 0.2; depth: 0.2">
                    <a-entity id="glassdoorL" gltf-model="aframe/glass-door/scene.gltf" position="-0.95 -2 0.09" scale="28.5 25 20" rotation="0 180 0"></a-entity>
                </a-box>

                <a-box id="rotingr" openr color="#DAD5D4" position="-1.79 2 7.5" geometry="height: 4; width: 0.2; depth: 0.2">
                    <a-entity id="glassdoorR" gltf-model="aframe/glass-door/scene.gltf" position="0.95 -2 0" scale="28.5 25 20"></a-entity>
                </a-box>
                {/* <!--wall with three windows--> */}
                <a-box class="pointable" data-brackets-id="1637" color="#DAD5D4" position="-3.83305 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>
                <a-box class="pointable" data-brackets-id="1637" color="#DAD5D4" position="3.89924 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>
                <a-entity data-brackets-id="3153" gltf-model="" position="-9.93211 1 0.44978" scale="0.0106 0.021 0.03" rotation="0 -90 0"></a-entity>
                <a-box class="pointable" data-brackets-id="1062" color="#DAD5D4" position="-9.9 3.36514 0.45838" material="" geometry="width: 0.2; height: 1.29; depth: 1.03"></a-box>
                <a-box class="pointable" data-brackets-id="1138" color="#DAD5D4" position="-9.9 3.37736 5.46013" material="" geometry="width: 0.2; height: 1.28; depth: 1.02"></a-box>
                <a-box class="pointable" data-brackets-id="1062" color="#DAD5D4" position="-9.9 0.50597 0.45838" material="" geometry="width: 0.2; depth: 1.03"></a-box>
                <a-box class="pointable" data-brackets-id="808" color="#DAD5D4" position="-9.9 0.47759 5.4519" material="" geometry="width: 0.2; depth: 1.02"></a-box>
                <a-box class="pointable" data-brackets-id="3234" geometry="depth: 4; height: 4; width: 0.2" color="#DAD5D4" position="-9.9 2 2.95027" ></a-box>
                <a-entity data-brackets-id="3224" gltf-model="" position="-9.93211 1 5.46438" scale="0.011 0.021 0.03" rotation="0 -90 0"></a-entity>
                <a-box class="pointable" data-brackets-id="3234" geometry="depth: 4.06; height: 4; width: 0.2" color="#DAD5D4" position="-9.9 2 7.96626" ></a-box>
                <a-box class="pointable" data-brackets-id="303" color="#DAD5D4" position="-9.9 2 -1.99367" material="" geometry="height: 4; width: 0.2; depth: 3.9"></a-box>
                <a-box class="pointable" data-brackets-id="303" color="#DAD5D4" position="-9.9 2 -7.36268" material="" geometry="height: 4; width: 0.2; depth: 4.9"></a-box>
                <a-box class="pointable" data-brackets-id="1062" color="#DAD5D4" position="-9.9 0.50597 -4.45034" material="" geometry="width: 0.2; depth: 1.03"></a-box>
                <a-box class="pointable" data-brackets-id="1062" color="#DAD5D4" position="-9.9 3.36514 -4.4526" material="" geometry="width: 0.2; height: 1.29; depth: 1.03"></a-box>
                <a-entity class="pointable" data-brackets-id="3153" gltf-model="" position="-9.93211 1 -4.44978" scale="0.0106 0.021 0.03" rotation="0 -90 0"></a-entity>
                {/* <!--Coffee cup--> */}
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="1.0 0.8 2.45" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"></a-entity>
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="-0.5 0.8 2.45" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"
                />
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="-2.2 0.8 2.45" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"
                />
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="1.0 0.8 0.55" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"
                />
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="-0.5 0.8 0.55" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"
                />
                <a-entity
                    data-brackets-id="203"
                    class="pointable"
                    gltf-model="aframe/coffee_shop_cup/scene.gltf"
                    position="-2.2 0.8 0.55" scale="0.25 0.25 0.25"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.27 0.27 0.27"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.25 0.25 0.25"
                />

                
                {/* <!--text message on radio--> */}
                <a-entity id="introText" visible="false" position="9 1.26 -7.98" look-at="#camera">
                    <a-image src="aframe/inferno.jpg" position="0 0 -0.02" look-at="#camera"></a-image>
                    <a-plane width="1" height="0.6" color="black" opacity="0.8" side="double" look-at="#camera">
                        <a-entity text="value: Music !!; align: center; color:#F1570F;" scale="5 5 5"></a-entity>
                    </a-plane>
                </a-entity>

                {/* window */}
                <Entity class="pointable" gltf-model="aframe/sliding_window/scene.gltf" position="-9.89 1.85 -4.44" scale="0.0052 0.008 0.008" rotation="0 -90 0" />
                <Entity class="pointable" gltf-model="aframe/sliding_window/scene.gltf" position="-9.89 1.85 0.45" scale="0.0055 0.008 0.008" rotation="0 -90 0" />
                <Entity class="pointable" gltf-model="aframe/sliding_window/scene.gltf" position="-9.89 1.85 5.442" scale="0.0052 0.008 0.008" rotation="0 -90 0" />

                {/* welcome */}
                <a-plane show id="welcome" width="3" height="3" color="#DF4425" position="0 1.77 -3.275" opacity="0.8" visible="ture">
                    <a-entity text="value: Welcome to the meeting room!; color: #12B1F1; align: center; wrapCount: 10"></a-entity>
                </a-plane>
                {/* <!---light--> */}


                {/* <!--ceiling-skylight--> */}
                <a-box id="ceil" color="#DAD5D4" height="0.02" width="17" depth="20" position="1.5 3.97924 0" material="" >
                    <a-box color="#DAD5D4" height="0.02" width="3.03" depth="6.15" material="" geometry="width: 3.03; depth: 6.15" position="-9.99 0 -6.957"></a-box>
                </a-box>
                <a-entity id="skylight" gltf-model="aframe/roof_skylight/scene.gltf" scale="0.01 0.01 0.009" rotation="0 90 0" position="-8.39 3.856 4.578"></a-entity>
                <a-entity id="skylight" gltf-model="aframe/roof_skylight/scene.gltf" scale="0.01 0.01 0.009" rotation="0 90 0" position="-8.39 3.856 -1.042"></a-entity>

                {/* <!--decoration--> */}
                <a-entity class="pointable" id="deskplant" gltf-model="aframe/potted_plant/scene.gltf" scale="0.1 0.1 0.1" position="-3.26 0.77 0.524"></a-entity>
                <a-entity class="pointable" id="simple_pot" gltf-model="aframe/simple_pot_and_plant/scene.gltf"></a-entity>
                <a-entity class="pointable" id="office_desk" gltf-model="aframe/office_desk/scene.gltf" scale="0.05 0.028 0.04" position="-9.5 -0.08 -4.5"></a-entity>
                <a-entity id="sofa" gltf-model="aframe/sofa/scene.gltf" scale="0.01 0.01 0.01" rotation="0 90 0" position="-7.8 0 -7.0"></a-entity>
                <a-entity class="pointable" id="lamp" gltf-model="aframe/office_lamp/scene.gltf" scale="0.01 0.01 0.01" position="-8.96 0.804 -5.005" ></a-entity>
                <a-entity class="pointable" id="lamp_light" light="color: red; type: spot; angle: 30; distance: 0.66" position="8.06028 42.07691 -5.005" rotation="-90 0 0"></a-entity>

                {/* <!--VENDING machine--> */}
                <a-entity id="vending machine1"
                    gltf-model="aframe/vending_machine_coca_cola/scene.gltf"
                    position="12.82 1.162 -4.26"
                    rotation="0 -90 0"
                    scale="1 1 2"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 1.01 1.01 2.01"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 1 1 2"
                    showtext1>
                </a-entity>
                <a-entity id="v-mtext1" visible="false" position="8.5 2.5 -6.5" look-at="#camera">
                    <a-entity text="value: get some drink; align: center; color: white" scale="5 5 5" look-at="#camera"></a-entity>
                </a-entity>

                <a-entity id="vending-machine2"
                    gltf-model="aframe/vending_machine_coca_cola/scene.gltf"
                    position="12.81719 1.162 -2.95598"
                    rotation="0 -90 0"
                    scale="1 1 2"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 1.01 1.01 2.01"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 1 1 2"
                    showtext2>
                </a-entity>
                <a-entity id="v-mtext2" visible="false" position="8.5 2.5 -4.8" look-at="#camera">
                    <a-entity text="value: get some drink; align: center; color: white" scale="5 5 5" look-at="#camera"></a-entity>
                </a-entity>
                {/* <!--chandelier--> */}
                <a-entity id="chandelier" gltf-model="aframe/chandelier/scene.gltf" position="-0.57597 3.95402 -1.03613" rotation="0 -90 0" scale="0.003 0.002 0.005"></a-entity>

                {/* <!--photoframe--> */}
                <a-entity data-brackets-id="70" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="0.52 3.041 -9.8" rotation="0 -90 0" scale="1 0.8 1.7"></a-entity>
                <a-entity data-brackets-id="67" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.464 2.3 -9.8" rotation="0 -90 0" scale="1 0.9 1.5"></a-entity>
                <a-entity data-brackets-id="32" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="0.51 1.85 -9.8" rotation="0 -90 0" scale="1 2 1.7"></a-entity>
                <a-entity data-brackets-id="68" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.31 1.46 -9.8" rotation="0 -90 0"></a-entity>
                <a-entity data-brackets-id="71" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="-0.95 1.45 -9.8" rotation="0 -90 0"></a-entity>
                <a-entity data-brackets-id="69" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="1.35 2.24 -9.8" rotation="0 -90 0" scale=""></a-entity>
                <a-entity data-brackets-id="72" gltf-model="aframe/3d_architecture__photo_frame/scene.gltf" position="1.44 1.42 -9.8" rotation="0 -90 0" scale="1 0.9 1.3"></a-entity>

                {/*photes*/}
                <a-image src="aframe/O.jpg" position="0.51 1.85 -9.78" scale="0.91 1.47 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.97 1.53 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.91 1.47 1"
                >
                </a-image>
                <a-image src="aframe/Q.jpg" position="-0.464 2.3 -9.78" scale="0.76 0.66 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.82 0.72 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.76 0.66 1">
                </a-image>

                <a-image src="aframe/tooopen.jpg" position="0.52 3.041 -9.78" scale="0.84 0.58 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.9 0.64 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.84 0.58 1">
                </a-image>

                <a-image src="aframe/R.jpg" position="-0.95 1.45 -9.78" scale="0.51 0.72 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.57 0.78 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.51 0.72 1">
                </a-image>

                <a-image src="aframe/C.jpg" position="-0.31 1.46 -9.78" scale="0.5 0.75 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.56 0.81 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.5 0.75 1">
                </a-image>

                <a-image src="aframe/a.jpg" position="1.35 2.24 -9.78" scale="0.49 0.74 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.55 0.8 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.49 0.74 1">
                </a-image>

                <a-image src="aframe/b.jpg" position="1.44 1.42 -9.78" scale="0.64 0.66 1"
                    animation__scale="dur: 200; property: scale; startEvents: mouseenter; to: 0.7 0.72 1.06"
                    animation__scale_reverse="dur: 200; property: scale; startEvents: mouseleave; to: 0.64 0.66 1">
                </a-image>
            </Scene>
        </div>
    );
};


export default WebXR;
