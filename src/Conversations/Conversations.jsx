import React, { useContext } from 'react'
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { createConversation } from '../features/chatSlice';
import SocketContext from '../Context/SocketContext';
import SyncLoader from 'react-spinners/SyncLoader';

const Conversations = ({ onlineUsers, usertyping }) => {

    const dispatch = useDispatch()
    const { conversations } = useSelector((state) => state?.chat)
    const { user } = useSelector((state) => state?.user)
    const socket = useContext(SocketContext);

    // console.log(usertyping, 'user typing');

    const getReceiverId = async (receiver_id) => {
        const values = {
            token: user?.access_token,
            receiver_id
        }
        const res = await dispatch(createConversation(values))
        socket.emit('join conversation', res?.payload?._id)
    }

    const isUserOnline = (userId) => onlineUsers.some((onlineUser) => onlineUser.userId === userId);

    return (
        <div className="flex justify-start flex-col items-center w-full py-2">
            {
                conversations && conversations.map((convo) =>

                    <div key={convo?._id}
                        onClick={() => getReceiverId(convo?.users[1]?._id)}
                        className="flex justify-start cursor-pointer items-center w-full py-2">
                        <div className="w-[17%]">
                            <div
                                className={`relative w-[50px] h-[50px] rounded-full ${isUserOnline ? 'border-4 border-green-500' : ''
                                    }`}>
                                <img src=
                                    {convo?.name === user?.name ? convo?.users[0]?.image : convo?.picture}
                                    className='w-full h-full rounded-full' alt="" />
                            </div>
                        </div>
                        <div>
                            <h1>{
                                convo?.name === user?.name ? convo?.users[0]?.name : convo?.name
                            }
                            </h1>
                            <h1 className="text-xs">
                                {usertyping === convo?._id ? <SyncLoader color="#fff" size={8} /> : convo?.latestMessage?.message?.length > 30 ?
                                    `${convo?.latestMessage?.message?.substring(0, 30)}...` :
                                    convo?.latestMessage?.message}
                            </h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Conversations