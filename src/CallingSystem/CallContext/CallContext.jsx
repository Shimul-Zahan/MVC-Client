import React, { createContext, useEffect, useRef, useState } from 'react';
import { endCallAction } from '../code/endCall'
import { handleStartCalling } from '../code/startCall';

// Create the context
const CallContext = createContext();

const CallContextProvider = ({ children }) => {

    const [calling, setCalling] = useState(false)
    const [callStatus, setCallStatus] = useState('')
    const [localStream, setLocalStream] = useState()
    const videoRefLocal = useRef()
    const videoRefRemote = useRef()

    const handleCallAction = async () => {
        handleStartCalling(setCalling, setCallStatus)
    }


    const endCall = () => {
        endCallAction(setCalling, setCallStatus, localStream, videoRefLocal, videoRefRemote)
    }


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
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };

    console.log('locastream', localStream?.getTracks());


    useEffect(() => {
        if (calling) {
            startVideoStream();
        }
    }, [calling]);


    return (
        <CallContext.Provider value={{
            calling,
            setCalling,
            handleCallAction,
            endCall,
            videoRefLocal,
            videoRefRemote,
        }}>
            {children}
        </CallContext.Provider>
    );
};

export { CallContext, CallContextProvider };
