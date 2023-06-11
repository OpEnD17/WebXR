import { createDOM, cleanupDOM, throttle } from "../../tool/tools.ts";
import useConnect from "../../hooks/useConnect.js";
import useRoom from "../../hooks/useRoom.js";
import Avatar from "../../component/avatar/index.jsx";
import Pointer from "../../component/pointer/index.jsx";

import "./index.css";

import floor from "../../assets/image/floor.jpg";
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
import { Entity, Scene } from "aframe-react";
import React, { useEffect, useRef, useState } from "react";


const A = window.AFRAME;
const JitsiMeetJS = window.JitsiMeetJS;
const conf = JitsiMeetJS.events.conference;
const conn = JitsiMeetJS.events.connection;


const WebXR = () => {

    const connection = useConnect();
    const room = useRoom(connection);
    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState({});
    const [pointers, setPointers] = useState({});

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

    useEffect(() => {
        if (!registered.current && room) {
            A.registerComponent('send-pos', {
                tick: throttle(function () {
                    const rigPos = rigRef.current.el.object3D.position;
                    const position = this.el.object3D.position;
                    const rotation = this.el.getAttribute("rotation");
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
                        sendInfo("pos", { x: rigPos.x + position.x, z: rigPos.z + position.z, rx: -rotation.x, ry: rotation.y + 180, rz: -rotation.z });
                    }
                }, 1000)
            });

            for (const el of document.getElementsByClassName('pointable')) {
                console.log(el);
                el.addEventListener('mousedown', e => {
                    const point = e.detail.intersection.point;
                    const id = room.myUserId();
                    pointers[id] = point;
                    setPointers({ ...pointers });
                    sendInfo('pointerPos', point);
                })
            }

            floorRef.current.addEventListener('mouseup', e => {
                const point = e.detail.intersection.point;
                const camPos = camRef.current.el.object3D.position;
                console.log(camPos)
                const rig = rigRef.current.el;
                rig.setAttribute('position', { x: point.x - camPos.x, y: point.y, z: point.z - camPos.z });
                const pos = rig.object3D.position;
                const rotation = rig.getAttribute("rotation");
                console.log(pos, rotation);
                info.current[0] = pos.x - camPos.x;
                info.current[1] = pos.z - camPos.z;
                info.current[2] = rotation.x;
                info.current[3] = rotation.y;
                info.current[4] = rotation.z;
                sendInfo('pos', { x: pos.x - camPos.x, z: pos.z - camPos.z, rx: -rotation.x, ry: rotation.y + 180, rz: -rotation.z })
            });

            registered.current = true;
        }
    }, [room]);


    const onLocalTracks = tracks => {
        console.log('**************localTracks**************');
        console.log(tracks);
        for (const track of tracks) {
            localTracks.current.push(track);
        }
    };

    const onRemoteTrack = track => {
        console.log('**************remoteTrack**************');
        console.log(track);
        console.log(track.isLocal())
        console.log(remoteTracks.current);
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

    const onUserJoined = id => {
        console.log(`User ${id} Joined!`);
        users[id] = [0, 0, 0, 0, 0, id.substr(0, 6)];
        remoteTracks.current[id] = [null, null];
        setUsers({ ...users });
    };

    const onUserLeft = id => {
        console.log(`User ${id} left!`);
        delete users[id];
        delete pointers[id];
        setUsers({ ...users });
        setPointers({ ...pointers });
    };

    const onMessgeReceived = (r, data) => {
        console.log(data);
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
                pointers[r._id] = { x: data.x, y: data.y, z: data.z };
                setPointers({ ...pointers });
                break
            default:
                break;
        }
    };

    const onConnectionSuccess = () => {
        setConnected(true);
        room.on(conf.TRACK_ADDED, onRemoteTrack);
        room.on(conf.TRACK_REMOVED, track => { console.log(`track ${track} removed!`) });
        room.on(conf.CONFERENCE_JOINED, onConferenceJoined);
        room.on(conf.USER_JOINED, onUserJoined);
        room.on(conf.USER_LEFT, onUserLeft);
        room.on(conf.ENDPOINT_MESSAGE_RECEIVED, onMessgeReceived);
        room.join();
    };

    const sendInfo = (type, info) => {
        switch (type) {
            case 'pos':
                room.sendMessage({
                    type: 'pos',
                    x: info.x.toFixed(3),
                    z: info.z.toFixed(3),
                    rx: info.rx.toFixed(3),
                    ry: info.ry.toFixed(3),
                    rz: info.rz.toFixed(3)
                });
                break;
            case 'pointerPos':
                room.sendMessage({
                    type: 'pointerPos',
                    x: info.x.toFixed(3),
                    y: info.y.toFixed(3),
                    z: info.z.toFixed(3)
                });
                break;
            default:
                break;
        }
    };

    const connect = async () => {

        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        let flag = false;
        await navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                flag = true
            }, () => {
                console.log('Camera not available!');
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
    };

    const removeRemoteTracks = () => {
        console.log(Object.values(remoteTracks.current))
        Object.values(remoteTracks.current).forEach(tracks => {
            for (const track of tracks) {
                for (const t of track.containers) {
                    t.remove();
                }
            }
        })
    };

    const onRemovePointer = id => {
        if (id == room.myUserId()) {
            delete pointers[id];
            setPointers({ ...pointers });
        }
    }

    useEffect(() => {
        if (connected) {
            onConnectionSuccess();
        }
    }, [connected]);

    useEffect(() => {
        if (connection) {
            connect();
        }
        return () => hangup();
    }, [connection]);

    return (
        <div>
            <Scene id='scene' vr-mode-ui="enterVRButton: #VRButton">
                <div id="VRButton">Enter VR Mode</div>
                <Entity primitive="a-sky" radius="15" shadow="receive: true" src="aframe/sky.jpg" />
                <a-plane raycaster="object: .clickable" clickable id='floor' ref={floorRef} src={floor} repeat=" 60 60" rotation="-90 0 0" scale="25 25 1" />

                {/* <!--movement--> */}
                <Entity id='cameraRig' ref={rigRef} >
                    <Entity ref={camRef} primitive="a-camera" user-height="1.6" send-pos wasd-controls-enabled="true" look-controls="enabled:true">
                        <Entity
                            primitive="a-cursor"
                            cursor={{ fuse: false }}
                            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
                            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
                        />
                    </Entity>
                    <a-entity id='righthand' laser-controls="hand: right"></a-entity>
                </Entity>

                <a-box data-brackets-id="514" color="#AA0000" depth="0.2" height="0.7" width="5" material="" geometry="" position="-1.0 0.35 1.5"></a-box>
                <a-box color="#AA0000" depth="2.4" height="0.1" width="5.5" position="-1.0 0.73905 1.5"></a-box>

                {
                    Object.keys(users).map(id => {
                        return id !== "me" &&
                            <Avatar key={id} id={id} info={users[id]} track={(remoteTracks.current[id] && remoteTracks.current[id][1] != null) ? true : false} />
                    })
                }

                {
                    Object.keys(pointers).map(id => {
                        return <Pointer key={"pointer" + id} color={id} pos={pointers[id]} onclick={onRemovePointer} />
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

                {/* <!--ceiling--> */}
                <a-box id='ceil' color="white" height="1" width="20" depth="20" position="0 4.5 0"></a-box>
                {/* <!--wall--> */}
                <a-box color="white" position="9.9 2 0" material="" geometry="height: 4; width: 0.2; depth: 20"></a-box>
                <a-box color="white" position="0 2 -9.9" material="" geometry="height:4; width: 20; depth: 0.2"></a-box>
                <a-box color="white" position="7.3 2 7.5" material="" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity class='pointable' gltf-model="aframe/window/scene.gltf" position="3.82 -1.0 7.7" scale="0.04 0.074 0.04" rotation="0 60 0"></a-entity>
                <a-box color="white" position="-7.3 2 7.5" material="" geometry="height: 4; width: 5; depth: 0.2"></a-box>
                <a-entity gltf-model="aframe/window/scene.gltf" position="-3.86296 -1.0 7.7" scale="0.04 0.073 0.04" rotation="0 60 0"></a-entity>
                <a-box color="white" position="0.04123 2 7.5" material="" geometry="height: 4; width: 5.82; depth: 0.2"></a-box>
                <a-box color="white" position="-3.83305 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>
                <a-box color="white" position="3.89924 3.75848 7.5" material="" geometry="height: 0.55; width: 1.96; depth: 0.2"></a-box>
                <a-box color="white" position="-9.9 2 -5.01609" material="" geometry="height: 4; width: 0.2; depth: 9.94"></a-box>
            </Scene>
        </div>
    );
};


export default WebXR;
