import React, { useRef } from 'react'
import { IoDocuments } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { addFiles } from '../../features/chatSlice'

const Document = () => {

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    // handle the documents
    const documentHandler = async (e) => {
        let files = Array.from(e.target.files)
        files.forEach(file => {
            if (
                file.type !== 'application/pdf' &&
                file.type !== 'text/plain' &&
                file.type !== 'appliaction/msword' &&
                file.type !== 'appliaction/zip' &&
                file.type !== 'appliaction/vnd.rar' &&
                file.type !== 'appliaction/vnd.excel' &&
                file.type !== 'appliaction/vnd.ms-powerpoint'&&
                file.type !== 'audio/mpeg'&&
                file.type !== 'audio/wav'
            ) {
                files = files.filter((item) => item.name !== file.name)
                return;
            } else if (file.size > 1024 * 1024 * 5) {
                files = files.filter((item) => item.name !== file.name)
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(addFiles({
                        file: file,
                        type: file.type.split('/')[1],
                    }))
                }
            }
        });
    }
    return (
        <div>
            <button
                type='button'
                onClick={() => inputRef.current.click()}
                className='bg-green-500 h-14 w-14 flex justify-center items-center rounded-full'>
                <IoDocuments className='text-3xl' />
            </button>
            <input
                type="file"
                hidden
                ref={inputRef}
                accept='application/*, text/plain'
                onChange={documentHandler}
            />
        </div>
    )
}

export default Document