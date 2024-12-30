import React, { createContext, useState } from 'react';
import { endCallAction } from '../code/endCall'
import { handleStartCalling } from '../code/startCall';

// Create the context
const CallContext = createContext();

const CallContextProvider = ({ children }) => {

    const [calling, setCalling] = useState(false)
    const [callStatus, setCallStatus] = useState('')

    const handleCallAction = async () => {
        handleStartCalling(setCalling, setCallStatus)
    }


    const endCall = () => {
        endCallAction(setCalling, setCallStatus)
    }

    return (
        <CallContext.Provider value={{
            calling,
            setCalling,
            handleCallAction,
            endCall,
        }}>
            {children}
        </CallContext.Provider>
    );
};

export { CallContext, CallContextProvider };
