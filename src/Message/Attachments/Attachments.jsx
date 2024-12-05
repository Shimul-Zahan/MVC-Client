import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { ImAttachment } from "react-icons/im";
import { FaPoll } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import Images from '../Menus/Images';
import Document from '../Menus/Document';

const Attachments = ({ showAttachments, setShowAttachments, setShowPicker }) => {


    return (
        <div className='pr-5'>
            <ImAttachment onClick={() => {
                setShowPicker(false)
                setShowAttachments((prev) => !prev)
            }}
                className="text-3xl text-black cursor-pointer" />
            {/* Attachments menu here */}
            {
                showAttachments &&
                <div className='absolute bottom-[80px] space-y-1 transition-all duration-300'>
                    <div className='bg-green-500 h-14 w-14 flex justify-center items-center rounded-full'>
                        <FaPoll className='text-3xl' />
                    </div>
                    <div className='bg-green-500 h-14 w-14 flex justify-center items-center rounded-full'>
                        <IoIosContact className='text-3xl' />
                    </div>
                    <Document />
                    <div className='bg-green-500 h-14 w-14 flex justify-center items-center rounded-full'>
                        <FaCamera className='text-3xl' />
                    </div>
                    <div className='bg-green-500 h-14 w-14 flex justify-center items-center rounded-full'>
                        <RiEmojiStickerLine className='text-3xl' />
                    </div>
                    <Images />
                </div>
            }
        </div>
    )
}

export default Attachments