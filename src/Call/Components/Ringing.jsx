import React from 'react'

const Ringing = () => {
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