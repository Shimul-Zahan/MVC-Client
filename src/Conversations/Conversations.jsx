import React from 'react'
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { createConversation } from '../features/chatSlice';

const Conversations = () => {

    const dispatch = useDispatch()
    const { conversations } = useSelector((state) => state?.chat)
    console.log(conversations);
    const { user } = useSelector((state) => state?.user)
    // console.log(conversations, user?.access_token);

    const getReceiverId = async (receiver_id) => {
        console.log(receiver_id);
        const values = {
            token: user?.access_token,
            receiver_id
        }
        dispatch(createConversation(values))
    }

    return (
        <div className="flex justify-start flex-col items-center w-full py-2">
            {
                conversations && conversations.map((convo) =>
                    <div key={convo?._id}
                        onClick={() => getReceiverId(convo?.users[1]?._id)}
                        className="flex justify-start cursor-pointer items-center w-full py-2">
                        <div className="w-[17%]">
                            <div className="bg-[#6A7175] text-4xl w-[50px] h-[50px] flex justify-center items-center rounded-full">
                                <img src={convo?.picture} className='w-full h-full rounded-full' alt="" />
                            </div>
                        </div>
                        <div>
                            <h1>{convo?.name}</h1>
                            <h1 className="text-xs">{convo?.latestMessage?.message?.length > 30 ?
                                `${convo?.latestMessage?.message?.substring(0, 30)}...` :
                                convo?.latestMessage?.message}</h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Conversations