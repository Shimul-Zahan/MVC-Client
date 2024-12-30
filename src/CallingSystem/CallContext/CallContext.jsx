import React, { createContext, useState } from 'react';

// Create the context
const CallContext = createContext();

const CallContextProvider = ({ children }) => {

    const [calling, setCalling] = useState(false)

    const handleCallAction = async () => {
        setCalling(true)
    }

    return (
        <CallContext.Provider value={{
            calling,
            setCalling,
            handleCallAction
        }}>
            {children}
        </CallContext.Provider>
    );
};

export { CallContext, CallContextProvider };
