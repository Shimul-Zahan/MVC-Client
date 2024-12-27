import { useEffect, useState } from 'react';
import { FcVideoCall } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import CallAreaHeader from './Components/CallAreaHeader';
import CallArea from './Components/callArea';
import CallActions from './Components/CallActions';
import { useSelector } from 'react-redux';
import Ringing from './Components/Ringing';


const Call = ({
    call,
    setCall,
    callAccepted,
    userVideoRef,
    myVideoRef,
    callStreaming,
    answerCall,
    show,
    endCall
}) => {
    const { receiveingCall, callEnded, name, picture } = call;
    const { user } = useSelector((state) => state.user)


    return (
        <>
            {
                receiveingCall && !callEnded && (
                    <Ringing
                        myVideoRef={myVideoRef}
                        answerCall={answerCall}
                        user={user}
                        call={call}
                        setCall={setCall}
                    />
                )
            }

        </>
    )
}

export default Call