export const createDOM = (name: string, attri: object): HTMLElement => {
    const ele: HTMLElement | null = document.createElement(name);
    Object.keys(attri).forEach(key => {
        ele.setAttribute(key, attri[key]);
    })
    return ele;
};

export const cleanupDOM = (id: string): void => {
    const element: HTMLElement | null = document.getElementById(id);
    element && element.remove();
};

export const removeCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            stream.getVideoTracks()[0].stop();
        });
};

export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean,
        lastFn: ReturnType<typeof setTimeout>,
        lastTime: number;
    return function (this: any) {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

export const buildOptions = (appId: string, room: string): Object => {

    return {
        "hosts": {
            "domain": "8x8.vc",
            "focus": "focus.8x8.vc",
            "muc": "conference.vpaas-magic-cookie-658a633d955c461f97b1f5476495bff9.8x8.vc"
        },
        "hiddenDomain": "recorder.8x8.vc",
        "websocket": "wss://8x8.vc/vpaas-magic-cookie-658a633d955c461f97b1f5476495bff9/xmpp-websocket",
        "serviceUrl": "wss://8x8.vc/vpaas-magic-cookie-658a633d955c461f97b1f5476495bff9/xmpp-websocket?room=group15",
        "bosh": "//8x8.vc/vpaas-magic-cookie-658a633d955c461f97b1f5476495bff9/http-bind",
        "websocketKeepAlive": "https://8x8.vc/vpaas-magic-cookie-658a633d955c461f97b1f5476495bff9/_unlock?room=group15",
        "openBridgeChannel": "datachannel",
        "constraints": {
            "video": {
                "frameRate": 30,
                "height": {
                    "ideal": 720,
                    "max": 720,
                    "min": 180
                },
                "width": {
                    "ideal": 1280,
                    "max": 1280,
                    "min": 320
                }
            }
        },
        "disableSimulcast": false,
        "enableRemb": true,
        "enableTcc": true,
        "disableRtx": false,
        "useStunTurn": true,
        "p2p": {
            "enabled": false,
            "useStunTurn": true,
            "enableUnifiedOnChrome": true,
            "preferredCodec": "VP9",
            "disabledCodec": "H264"
        },
        "e2eping": {
            "enabled": false
        },
        "deploymentInfo": {
            "backendRelease": "3792",
            "crossRegion": 0,
            "shard": "prod-8x8-ap-sydney-1-s48",
            "userRegion": "ap-southeast-2",
            "environment": "prod-8x8",
            "releaseNumber": "7830"
        },
        "testing": {
            "setScreenSharingResolutionConstraints": true
        },
        "flags": {
            "sourceNameSignaling": true,
            "sendMultipleVideoStreams": true,
            "receiveMultipleVideoStreams": true
        },
        "disableModeratorIndicator": false,
        "disableSelfView": false,
        "disableSelfViewSettings": false,
        "channelLastN": -1,
        "lastNLimits": {},
        "startAudioMuted": null,
        "startWithAudioMuted": false,
        "startSilent": false,
        "startVideoMuted": null,
        "maxFullResolutionParticipants": 2,
        "enableLayerSuspension": true,
        "enableForcedReload": true,
        "enableLipSync": false,
        "disablePolls": false,
        "disableReactions": false,
        "useNewBandwidthAllocationStrategy": true,
        "enableUnifiedOnChrome": true,
        "videoQuality": {
            "disabledCodec": "H264",
            "preferredCodec": "VP09",
            "maxBitratesVideo": {
                "VP8": {
                    "low": 200000,
                    "standard": 500000,
                    "high": 1500000
                },
                "VP9": {
                    "low": 100000,
                    "standard": 300000,
                    "high": 1500000
                }
            },
            "minHeightForQualityLvl": {
                "540": "high",
                "240": "standard"
            }
        },
        "disableAudioLevels": true,
        "audioLevelsInterval": 200,
        "stereo": false,
        "forceJVB121Ratio": -1,
        "disableFilmstripAutohiding": false,
        "requireDisplayName": false,
        "hideDisplayName": false,
        "disableJoinLeaveSounds": false,
        "enableWelcomePage": false,
        "enableClosePage": false,
        "defaultLanguage": "en",
        "noticeMessage": null,
        "prejoinPageEnabled": false,
        "prejoinConfig": {
            "enabled": false,
            "hideDisplayName": false
        },
        "readOnlyName": false,
        "enableInsecureRoomNameWarning": true,
        "enableNoisyMicDetection": false,
        "enableNoAudioDetection": false,
        "enableTalkWhileMuted": false,
        "disableDeepLinking": true,
        "transcribingEnabled": false,
        "transcribeWithAppLanguage": true,
        "preferredTranscriptionLanguage": null,
        "autoCaptionOnRecord": false,
        "transcription": {
            "enabled": false,
            "useAppLanguage": true,
            "preferredLanguage": null,
            "disableStartForAll": false,
            "autoCaptionOnRecord": false
        },
        "liveStreamingEnabled": false,
        "liveStreaming": {
            "enabled": false,
            "termsLink": null,
            "dataPrivacyLink": null
        },
        "fileRecordingsEnabled": false,
        "recordingService": {
            "enabled": false,
            "sharingEnabled": false,
            "hideStorageWarning": true
        },
        "fileRecordingsServiceEnabled": false,
        "fileRecordingsServiceSharingEnabled": false,
        "localRecording": {
            "disable": true,
            "notifyAllParticipants": true,
            "disableSelfRecording": true
        },
        "toolbarButtons": [
            "camera",
            "chat",
            "closedcaptions",
            "desktop",
            "download",
            "embedmeeting",
            "etherpad",
            "feedback",
            "filmstrip",
            "fullscreen",
            "hangup",
            "help",
            "highlight",
            "invite",
            "linktosalesforce",
            "livestreaming",
            "microphone",
            "mute-everyone",
            "mute-video-everyone",
            "participants-pane",
            "profile",
            "raisehand",
            "recording",
            "security",
            "select-background",
            "settings",
            "shareaudio",
            "noisesuppression",
            "sharedvideo",
            "shortcuts",
            "stats",
            "tileview",
            "toggle-camera",
            "videoquality",
            "__end"
        ],
        "toolbarConfig": {
            "initialTimeout": 20000,
            "timeout": 4000,
            "alwaysVisible": false
        },
        "notifications": null,
        "disabledNotifications": [],
        "disableShortcuts": false,
        "enableCalendarIntegration": false,
        "googleApiApplicationClientID": "",
        "dialInConfCodeUrl": null,
        "dialInNumbersUrl": null,
        "dialOutAuthUrl": null,
        "dialOutCodesUrl": null,
        "brandingDataUrl": null,
        "disableThirdPartyRequests": false,
        "analytics": {
            "disabled": true,
            "amplitudeAPPKey": null,
            "googleAnalyticsTrackingId": null,
            "matomoEndpoint": null,
            "matomoSiteID": null,
            "rtcstatsEnabled": false,
            "rtcstatsEndpoint": "wss://rtcstats-server-8x8.jitsi.net/",
            "rtcstatsPollInterval": 10000,
            "rtcstatsSendSdp": false
        },
        "callStatsID": null,
        "callStatsSecret": null,
        "feedbackPercentage": null,
        "presenterCameraPosition": "bottom-right"
    };
};

export const getToken = (): String => {
    return "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNjU4YTYzM2Q5NTVjNDYxZjk3YjFmNTQ3NjQ5NWJmZjkvMjg4ZWY0IiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2ODM4OTg4MTQsImV4cCI6MTY5MzkwNjAxNCwibmJmIjoxNjgzODk4ODA5LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNjU4YTYzM2Q5NTVjNDYxZjk3YjFmNTQ3NjQ5NWJmZjkiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6Inc3NjMwMjM5NDEiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTAwNzEzNDUyNjM0ODA3NTg0NjQyIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ3NzYzMDIzOTQxQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.GcyWR8N5p0XB1toOQGoZH--VGaAIqmGzivqIcRikp3aDheJyrD-_CLhHizvm6yfxRtJQLEFWYp3uzC1AsAfsZ9x1JRA_uJ5lQkApZatk6Z-pJunyHQDH4TpnTLBIZjyza-rpXMUrPx_h0t0EDK8T9e9iOqTpzjlCyBm5drXpi2pVMFrYacwbQG-Pvnb3UMbcV2pTDh6idjMs8Rz2qzO6STQB7hK9zU-OIPtD6wNPb2jVO_q5OADcguyOpTRbEMAACsHnlZonuSdoR4ht5oJWDU77dD4iA6B5wLEbWDPrv6QXTesrpukem9VERKO5nS0LYDD2akQACu5J8GpScG7mqw";
};
