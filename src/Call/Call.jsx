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
    const [showActions, setShowActions] = useState(false)


    return (
        <>
            {/* Call body */}
            <div className='z-10 h-screen flex justify-center items-center'>
                {/* container */}
                <div onMouseOver={() => setShowActions(true)}
                    onMouseOut={() => setShowActions(false)}
                    className='border relative h-[80%] w-[400px] bg-red-500 rounded-xl'>
                    <div className=''>
                        {/* call header */}
                        <CallAreaHeader name={name} picture={picture} />
                        {/* Call area */}
                        <div className='pt-5 p-3'>
                            <CallArea name={name} picture={picture} />
                        </div>
                        {
                            showActions && <div className='absolute bottom-0 w-full'>
                                <CallActions endCall={endCall} />
                            </div>
                        }
                        {/* video stream here */}
                        <div>
                            {/* user video */}
                            {callAccepted && !callEnded && (
                                <div>
                                    <video
                                        ref={userVideoRef}
                                        playsInline
                                        muted
                                        autoPlay
                                        className="h-full w-full"
                                    ></video>
                                </div>
                            )}
                        </div>
                        <div>
                            {/* My video */}
                            {callStreaming && (
                                <div className={`bg-transparent h-32 w-24 absolute right-0 rounded-lg ${showActions ? ' bottom-[100px]' : 'bottom-0'}`}>
                                    <video
                                        ref={myVideoRef}
                                        playsInline
                                        muted
                                        autoPlay
                                        className='h-32'
                                    ></video>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

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