import { FaAngleUp } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { FcEndCall } from "react-icons/fc";
import { useState } from "react";

const CallActions = () => {
    return (
        <div className='bg-gray-700 w-full h-[90px] rounded-xl'>
            <div className="flex justify-center text-white text-xl">
                <FaAngleUp />
            </div>
            <div className="text-3xl font-bold w-full h-[70px] text-white flex justify-between items-center px-10">
                <button>
                    <FaVolumeUp />
                </button>
                <button>
                    <BsFillMicMuteFill />
                </button>
                <button>
                    <IoVideocam />
                </button>
                <button>
                    <FcEndCall />
                </button>
            </div>
        </div>
    )
}

export default CallActions