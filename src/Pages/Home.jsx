import React from 'react'
import { Sidebar } from '../Components/Sidebar'
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegStopCircle } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiStatusOnline } from "react-icons/hi";

const Home = () => {
  return (
    <div className='min-h-screen w-full dark:bg-dark_bg dark:text-dark_text flex py-[19px] px-5'>
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
        </div>
      </div>
      {/* container */}
      <div className="container flex h-full py-[10px]">
        {/* sidebar */}
        <Sidebar />
      </div>
      <h1>Hello</h1>
    </div>
  )
}

export default Home