import { IoCaretBackSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";

const CallAreaHeader = ({ name, picture }) => {
    return (
        <div className='text-sm text-white flex justify-between items-center p-3'>
            <button>
                <IoCaretBackSharp className='text-2xl' />
            </button>
            <div className='flex justify-center items-center gap-2'>
                <FaLock />
                <h1>end to end encrypted</h1>
            </div>
            <button>
                <MdOutlineGroupAdd className='text-2xl' />
            </button>
        </div>

    )
}

export default CallAreaHeader