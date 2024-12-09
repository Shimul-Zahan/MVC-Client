import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from '../Components/Sidebar'
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegStopCircle } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiStatusOnline } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { getConvo, updateMessageAndConversation } from '../features/chatSlice';
import Chats from '../Chats/Chats';
import SocketContext from '../Context/SocketContext';
import Call from '../Call/Call';

const callData = {
  receiveingCall: false,
  callEnded: false,
}


const Home = () => {
  const { user } = useSelector((state) => state.user)
  const { files } = useSelector((state) => state.chat)
  console.log(files);
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUser] = useState([])
  const [usertyping, setUserTyping] = useState(false)

  // for all types of callings
  const [call, setCall] = useState(callData)
  const { receiveingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false)

  // realtime message get
  useEffect(() => {
    // listening message
    socket.on('receive message', (message) => {
      dispatch(updateMessageAndConversation(message))
    })
    // listening typing
    socket.on('typing', (conversation) => setUserTyping(conversation))
    socket.on('stop typing', () => setUserTyping(false))
  }, [])

  // jon userinto the socket.io
  useEffect(() => {
    socket.emit('join', user._id)
    // get all the active users
    socket.on('get online users', (users) => {
      console.log(onlineUsers);
      setOnlineUser(users)
    })
  }, [user])

  // get conversation
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConvo(user.access_token))
    }
  }, [user])

  return (
    <div className='relative'>
      <div className='min-h-screen w-full dark:bg-dark_bg dark:text-dark_text flex'>
        {/* small sidebar */}
        <div className='h-full'>
          <div className='px-3 py-[10px] flex flex-col justify-start items-center gap-5'>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <LuMessagesSquare className='text-white text-2xl' />
            </div>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <HiStatusOnline className='text-white text-2xl' />
            </div>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <FaRegStopCircle className='text-white text-2xl' />
            </div>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <HiMiniUserGroup className='text-white text-2xl' />
            </div>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <CiSettings className='text-white text-2xl' />
            </div>
            <div className='bg-[#374248] rounded-full h-[50px] w-[50px] flex justify-center items-center'>
              <img src={user && user?.image} className='h-full w-full rounded-full' alt='profile image' />
            </div>
          </div>
        </div>
        {/* container */}
        <div className="container flex h-full py-[10px]">
          {/* sidebar */}
          <Sidebar onlineUsers={onlineUsers} usertyping={usertyping} />
        </div>
        {/* message section here */}
        <div className='bg-[#222E35] w-[66%] '>
          <Chats usertyping={usertyping} />
        </div>
      </div>

      {/* for calling */}

      <div>
        <Call call={call} setCall={setCall} callAccepted={callAccepted} />
      </div>
    </div>
  )
}

export default Home