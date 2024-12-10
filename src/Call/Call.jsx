import { useEffect, useState } from 'react';
import audioFile from './assets/laughter-man-sqeeek-80612-64949.mp3';
import { FcVideoCall } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import CallAreaHeader from './Components/CallAreaHeader';
import CallArea from './Components/callArea';
import CallActions from './Components/CallActions';


const Call = ({
    call,
    setCall,
    callAccepted,
    userVideoRef,
    myVideoRef,
    callStreaming,
}) => {
    const { receiveingCall, callEnded } = call;
    let intervalId;
    const [timer, setTimer] = useState(0)
    const [showActions, setShowActions] = useState(false)


    const handleTimer = () => {
        intervalId = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, (1000));
    }

    console.log(timer);

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
            {
                receiveingCall && !callAccepted &&
                <div className='flex relative justify-center items-center z-50 h-screen'>
                    {/* container */}
                    <div className='border h-40 w-full bg-gray-50 rounded-lg p-4 flex justify-between items-center'>
                        {/* call infos */}
                        <div className='flex items-center gap-5'>
                            <img src="https://wallpapers.com/images/high/funny-profile-picture-r8l2gifvpdd0kt25.webp" alt="" className='w- h-32 w-32 rounded-full' />
                            <div>
                                <h1 className='text-2xl font-medium'>Shimul Zahan</h1>
                                <h1 className='text-xl font-medium'>Request to video call...</h1>
                            </div>
                        </div>
                        {/* call actions */}
                        <div className='text-4xl flex justify-center items-center gap-8'>
                            <button>
                                <FcCancel />
                            </button>
                            <button>
                                <FcVideoCall />
                            </button>
                        </div>
                    </div>

                    {/* ringtone here */}
                    <audio src={audioFile} autoPlay loop></audio>
                </div>
            }

            {/* Call body */}
            <div className=''>
                <div className='z-10 h-screen flex justify-center items-center'>
                    {/* container */}
                    <div onMouseOver={() => setShowActions(true)}
                        onMouseOut={() => setShowActions(false)}
                        className='border relative h-[80%] w-[400px] bg-red-500 rounded-xl'>
                        <div className=''>
                            {/* call header */}
                            <CallAreaHeader />
                            {/* Call area */}
                            <div className='pt-5 p-3'>
                                <CallArea />
                            </div>
                            {
                                showActions && <div className='absolute bottom-0 w-full'>
                                    <CallActions />
                                </div>
                            }
                            {/* video stream here */}
                            <div>
                                {/* user video */}
                                <div className=''>
                                    <video ref={userVideoRef}
                                        playsInline
                                        muted
                                        autoPlay
                                        className='h-full w-full'
                                    ></video>
                                </div>
                            </div>
                            <div>
                                {/* My video */}
                                <div className={`bg-blue-500 h-32 w-24 absolute right-0 rounded-lg ${showActions ? ' bottom-[100px]' : 'bottom-0'}`}>
                                    <video ref={myVideoRef} playsInline muted autoPlay></video>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Call