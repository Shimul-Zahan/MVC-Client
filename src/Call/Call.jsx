import { useEffect, useState } from 'react';
import audioFile from './assets/laughter-man-sqeeek-80612-64949.mp3';
import { FcVideoCall } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import CallAreaHeader from './Components/CallAreaHeader';
import CallArea from './Components/callArea';

const Call = ({ call, setCall, callAccepted }) => {

    const { receiveingCall, callEnded } = call;
    let intervalId;
    const [timer, setTimer] = useState(0)


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
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center'>
                    {/* container */}
                    <div className='border h-40 w-[35%] bg-gray-50 rounded-lg p-4 flex justify-between items-center'>
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
            <div>
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center'>
                    {/* container */}
                    <div className='border h-[80%] w-[25%] bg-gray-800 rounded-xl p-3'>
                        {/* call header */}
                        <CallAreaHeader />
                        {/* Call area */}
                        <div className='pt-5'>
                            <CallArea />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Call