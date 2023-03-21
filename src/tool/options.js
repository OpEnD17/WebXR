const options = () => {

    return {
        "hosts": {
            "domain": "8x8.vc",
            "focus": "focus.8x8.vc",
            "muc": "conference.vpaas-magic-cookie-1c35e0eb9e54413a9f4f43797eccb55a.8x8.vc"
        },
        "hiddenDomain": "recorder.8x8.vc",
        "websocket": "wss://8x8.vc/vpaas-magic-cookie-1c35e0eb9e54413a9f4f43797eccb55a/xmpp-websocket",
        "serviceUrl": "wss://8x8.vc/vpaas-magic-cookie-1c35e0eb9e54413a9f4f43797eccb55a/xmpp-websocket?room=group15",
        // "bosh": "//8x8.vc/vpaas-magic-cookie-1c35e0eb9e54413a9f4f43797eccb55a/http-bind",
        "websocketKeepAlive": "https://8x8.vc/vpaas-magic-cookie-1c35e0eb9e54413a9f4f43797eccb55a/_unlock?room=group15",
        "openBridgeChannel": "websocket",
        // "resolution": 720,
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
            "enabled": true,
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
}

export default options;
