import React from 'react'
import { RxAvatar } from 'react-icons/rx';
import { useSelector } from 'react-redux'

const Conversations = () => {

    const { conversations } = useSelector((state) => state.chat)
    console.log(conversations);

    return (
        <div className="flex justify-start flex-col items-center w-full py-2">
            {
                conversations && conversations.map((convo) =>
                    <div className="flex justify-start items-center w-full py-2">
                        <div className="w-[17%]">
                            <div className="bg-[#6A7175] text-4xl w-[50px] h-[50px] flex justify-center items-center rounded-full">
                                <img src={convo?.picture} className='w-full h-full rounded-full' alt="" />
                            </div>
                        </div>
                        <div>
                            <h1>{convo?.name}</h1>
                            <h1 className="text-xs">{convo?.latestMessage?.message}</h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Conversations