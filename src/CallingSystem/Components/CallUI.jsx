import React, { useContext, useState } from 'react';
import { CallContext } from '../CallContext/CallContext';

// Import React Icons
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaCommentAlt, FaPhoneSlash, FaPhoneVolume } from 'react-icons/fa';

const VideoCallUI = () => {
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const { setCalling } = useContext(CallContext);

    const toggleMute = () => {
        setIsMicMuted((prevState) => !prevState);
    };

    const toggleCamera = () => {
        setIsCameraOff((prevState) => !prevState);
    };

    const toggleScreenSharing = () => {
        setIsScreenSharing((prevState) => !prevState);
    };

    const endCall = () => {
        setCalling(false);
        console.log('Call Ended');
        // Here you can add functionality to end the call (e.g., disconnect)
    };

    const openChat = () => {
        console.log("Chat button clicked");
        // Implement your chat functionality here
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900">
            {/* Video Screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="relative w-full h-72 md:h-96 bg-gray-600 rounded-lg">
                    <video
                        autoPlay
                        muted
                        className="w-full h-full object-cover rounded-lg"
                    // ref={videoRefLocal}
                    ></video>
                    <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full p-1">
                        You
                    </div>
                </div>
                <div className="relative w-full h-72 md:h-96 bg-gray-600 rounded-lg">
                    <video
                        autoPlay
                        className="w-full h-full object-cover rounded-lg"
                    // ref={videoRefRemote}
                    ></video>
                    <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full p-1">
                        Participant
                    </div>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-8 mt-6">
                {/* Mute/Unmute Button */}
                <button
                    onClick={toggleMute}
                    className={`w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center ${isMicMuted ? 'bg-red-600' : 'bg-green-600'
                        }`}
                >
                    <FaMicrophoneSlash className={`${isMicMuted ? 'block' : 'hidden'}`} />
                    <FaMicrophone className={`${isMicMuted ? 'hidden' : 'block'}`} />
                </button>

                {/* Camera On/Off Button */}
                <button
                    onClick={toggleCamera}
                    className={`w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center ${isCameraOff ? 'bg-red-600' : 'bg-green-600'
                        }`}
                >
                    <FaVideoSlash className={`${isCameraOff ? 'block' : 'hidden'}`} />
                    <FaVideo className={`${isCameraOff ? 'hidden' : 'block'}`} />
                </button>

                {/* Screen Sharing Button */}
                <button
                    onClick={toggleScreenSharing}
                    className={`w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                    <FaDesktop />
                </button>

                {/* Chat Button */}
                <button
                    onClick={openChat}
                    className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center"
                >
                    <FaCommentAlt />
                </button>

                {/* End Call Button */}
                <button
                    onClick={endCall}
                    className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center"
                >
                    <FaPhoneSlash />
                </button>

            </div>
        </div>
    );
};

export default VideoCallUI;
