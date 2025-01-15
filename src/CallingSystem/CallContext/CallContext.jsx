import React, { createContext, useEffect, useRef, useState } from 'react';
import { endCallAction } from '../code/endCall'
import { handleStartCalling } from '../code/startCall';
import { mute } from '../code/mute';
import { turnOffCamera } from '../code/turnOffCamera';
import { startScreenSharing, stopScreenSharing } from '../code/screenSharing';

// Create the context
const CallContext = createContext();

const CallContextProvider = ({ children }) => {

    const [calling, setCalling] = useState(false)
    const [callStatus, setCallStatus] = useState('')
    // For caller
    const [localStream, setLocalStream] = useState()
    // For receiver
    const [remoteStream, setRemoteSream] = useState()
    // for actions
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [status, setStatus] = useState({})
    const [originalVideoTrack, setOriginalVideoTrack] = useState(null);
    const [screenStream, setScreenStream] = useState()

    const videoRefLocal = useRef()
    const videoRefRemote = useRef()

    // here are for enable video calling media
    const startVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Assign the stream to the local video element
            videoRefLocal.current.srcObject = stream;

            // Save the stream to use later in call (e.g., for WebRTC)
            setLocalStream(stream);

            // navigator.mediaDevices.getUserMedia({
            //     video: true,
            //     audio: true,
            // })
            //     .then((stream) => {
            //         videoRefLocal.current.srcObject = stream;
            //         // Save the stream to use later in call (e.g., for WebRTC)
            //         setLocalStream(stream);
            //     })
            //     .catch((err) => {
            //         console.error("Error accessing media devices:", err);
            //     })

        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };


    useEffect(() => {
        if (calling) {
            startVideoStream();
        }
    }, [calling]);

    // All Actions here
    const handleCallAction = async () => {
        setCalling(true);
        setCallStatus('dialing');
        await peerConnectionAndIcecandidates()
    }

    const peerConnectionAndIcecandidates = async () => {
        // STUN server for NAT traversal
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
            ],
        });

        console.log(peerConnection);

        /*
        Once you have access to the local media (audio/video), you need to add it to the peer connection so that it can be sent to the remote peer.
        You can use the addTrack() method to add tracks (audio or video) to the connection.
        */
        if (localStream) {
            console.log(localStream);
        }
    }

    const endCall = () => {
        endCallAction(setCalling, setCallStatus, localStream, videoRefLocal, videoRefRemote, screenStream)
    }

    const toggleMute = () => {
        setIsMicMuted((prevState) => !prevState);
        mute(localStream, setStatus)
    };

    const toggleCamera = () => {
        setIsCameraOff((prevState) => !prevState);
        turnOffCamera(localStream)
    };

    const toggleScreenSharing = async () => {
        if (isScreenSharing) {
            stopScreenSharing(originalVideoTrack, videoRefLocal, setLocalStream);
        } else {
            startScreenSharing(localStream, setLocalStream, videoRefLocal, setOriginalVideoTrack, setScreenStream);
        }
        setIsScreenSharing(prevState => !prevState);
    };



    return (
        <CallContext.Provider value={{
            calling,
            setCalling,
            handleCallAction,
            endCall,
            videoRefLocal,
            videoRefRemote,
            toggleCamera,
            toggleMute,
            toggleScreenSharing,
            isCameraOff,
            isMicMuted,
            isScreenSharing,
            status,
        }}>
            {children}
        </CallContext.Provider>
    );
};

export { CallContext, CallContextProvider };
