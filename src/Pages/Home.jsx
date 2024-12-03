import React, { useEffect } from 'react'
import { Sidebar } from '../Components/Sidebar'
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegStopCircle } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiStatusOnline } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { getConvo } from '../features/chatSlice';
import Chats from '../Chats/Chats';

const Home = () => {

  const { user, status } = useSelector((state) => state.user)
  console.log(user, status);
  const dispatch = useDispatch()


  // get conversation
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConvo(user.access_token))
    }
  }, [user])

  return (
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
        <Sidebar />
      </div>
      {/* message section here */}
      <div className='bg-[#222E35] w-[66%] '>
        <Chats />
      </div>
    </div>
  )
}

export default Home