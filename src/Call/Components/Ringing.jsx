import audioFile from '../assets/laughter-man-sqeeek-80612-64949.mp3';
import picture from '../../assets/react.svg'
import { FcCancel, FcVideoCall } from 'react-icons/fc';
import { useEffect, useState } from 'react';


const Ringing = ({ answerCall, user, call, setCall }) => {

    const { receiveingCall, callEnde } = call
    const [timer, setTimer] = useState(0)
    const [showActions, setShowActions] = useState(false)
    let intervalId;

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
        <div className='flex relative justify-center items-center z-50 h-screen'>
            {/* container */}
            <div className='border h-40 w-full bg-gray-50 rounded-lg p-4 flex justify-between items-center'>
                {/* call infos */}
                <div className='flex items-center gap-5'>
                    <img src={picture} alt="" className='w- h-32 w-32 rounded-full' />
                    <div>
                        <h1 className='text-2xl font-medium'>{user?.name}</h1>
                        <h1 className='text-xl font-medium'>Request to video call...</h1>
                    </div>
                </div>
                {/* call actions */}
                <div className='text-4xl flex justify-center items-center gap-8'>
                    <button onClick={() => endCall()}>
                        <FcCancel />
                    </button>
                    <button onClick={answerCall}>
                        <FcVideoCall />
                    </button>
                </div>
            </div>

            {/* ringtone here */}
            <audio src={audioFile} autoPlay loop></audio>
        </div>
    )
}

export default Ringing