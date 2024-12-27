import { useEffect, useState } from 'react';
import audioFile from './assets/laughter-man-sqeeek-80612-64949.mp3';
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
    let intervalId;
    const [timer, setTimer] = useState(0)
    const [showActions, setShowActions] = useState(false)

    // console.log(show, 'from the call page');


    const handleTimer = () => {
        intervalId = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, (1000));
    }

    // console.log(callStreaming, receiveingCall, callAccepted, "from call components");

    useEffect(() => {
        if (timer < 30) {
            handleTimer()
        } else {
            setCall({ ...call, receiveingCall: false })
        }
        // Cleanup interval
        return () => {
            clearInterval(intervalId);
        }
    }, [timer])

    return (
        <>
            <Ringing />
            {/* Call body */}
            <div className={`${show ? '' : 'hidden'}`}>
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
                                    <div className={`bg-blue-500 h-32 w-24 absolute right-0 rounded-lg ${showActions ? ' bottom-[100px]' : 'bottom-0'}`}>
                                        <video
                                            ref={myVideoRef}
                                            playsInline
                                            muted
                                            autoPlay
                                        ></video>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Call