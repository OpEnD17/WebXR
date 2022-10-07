const options = {
    "hosts": {
        "domain": "sp5-15.onavstack.net",
        "muc": "conference.sp5-15.onavstack.net",
        "focus": "focus.sp5-15.onavstack.net"
    },
    "hiddenDomain": "hidden-services.sp5-15.onavstack.net",
    "websocket": "wss://sp5-15.onavstack.net/xmpp-sin/xmpp-websocket",
    "serviceUrl": "wss://sp5-15.onavstack.net/xmpp-sin/xmpp-websocket",
    "bosh": "https://sp5-15.onavstack.net/xmpp-sin/http-bind",
    "websocketKeepAlive": -1,
    "openBridgeChannel": "websocket",
    "resolution": 720,
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
        "stunServers": [
            {
                "urls": "stun:turn.avstack.net:443"
            }
        ],
        "preferredCodec": "VP8"
    },
    "e2eping": {
        "pingInterval": -1
    },
    "deploymentInfo": {
        "userRegion": "sin",
        "environment": "avstack",
        "releaseNumber": "7830"
    },
    "testing": {
        "enableThumbnailReordering": true,
        "mobileXmppWsThreshold": 100,
        "setScreenSharingResolutionConstraints": true
    },
    "flags": {
        "sourceNameSignaling": false,
        "sendMultipleVideoStreams": false,
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
        "preferredCodec": "VP8",
        "enforcePreferredCodec": false,
        "maxBitratesVideo": {
            "low": 200000,
            "standard": 500000,
            "high": 1500000,
            "H264": {
                "low": 200000,
                "standard": 500000,
                "high": 1500000
            },
            "VP8": {
                "low": 200000,
                "standard": 500000,
                "high": 1500000
            },
            "VP9": {
                "low": 200000,
                "standard": 500000,
                "high": 1500000
            }
        },
        "minHeightForQualityLvl": {
            "540": "high",
            "240": "standard"
        },
        "resizeDesktopForPresenter": false
    },
    "startBitrate": "800",
    "audioQuality": {
        "stereo": false,
        "opusMaxAverageBitrate": null
    },
    "disableAudioLevels": true,
    "audioLevelsInterval": 200,
    "stereo": false,
    "disableAEC": false,
    "disableAGC": false,
    "disableAP": false,
    "disableHPF": false,
    "disableNS": false,
    "desktopSharingFrameRate": {
        "min": 5,
        "max": 5
    },
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
        "rtcstatsEndpoint": "wss://sp5-15.onavstack.net/rtcstats",
        "rtcstatsPollInterval": 30000,
        "rtcstatsSendSdp": false
    },
    "callStatsID": null,
    "callStatsSecret": null,
    "feedbackPercentage": null,
    "gravatar": {
        "disabled": false,
        "baseUrl": "https://www.gravatar.com/avatar/"
    },
    "presenterCameraPosition": "bottom-right"
};

export default options;