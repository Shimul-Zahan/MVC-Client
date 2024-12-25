import React, { createContext, useState } from 'react';

// Create the context
const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
    const [openWindow, setOpenWindow] = useState(false)
    const [openGroup, setOpenGroup] = useState()

    return (
        <UtilityContext.Provider value={{
            openWindow,
            setOpenWindow,
            openGroup,
            setOpenGroup
        }}>
            {children}
        </UtilityContext.Provider>
    );
};

export { UtilityContext, UtilityProvider };
