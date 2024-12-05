import React, { useRef } from 'react'
import { FaImages } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles } from '../../features/chatSlice'

const Images = () => {

    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const { files } = useSelector((state) => state.chat)
    // console.log(files, "files here");

    // handle image here
    const imageHandler = async (e) => {
        let files = Array.from(e.target.files)
        files.forEach(file => {
            if (
                file.type !== 'image/png' &&
                file.type !== 'image/jpeg' &&
                file.type !== 'image/webp' &&
                file.type !== 'image/gif'&&
                file.type !== 'video/mp4' &&
                file.type !== 'image/mpeg' &&
                file.type !== 'image/webm' &&
                file.type !== 'image/webp'
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
                        fileData: e.target.result,
                        type: file.type.split('/')[0],
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
                <FaImages className='text-3xl' />
            </button>
            <input
                type="file"
                hidden
                ref={inputRef}
                accept='image/png,image/jpg, image/jpeg, image/webp, image/gif, video/mp4, video/mpeg'
                onChange={imageHandler}
            />
        </div>
    )
}

export default Images