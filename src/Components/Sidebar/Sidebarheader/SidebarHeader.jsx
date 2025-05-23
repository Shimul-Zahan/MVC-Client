import { AiOutlineWechat } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdArchive } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import Conversations from "../../../Conversations/Conversations";
import { useContext, useState } from "react";
import GroupMenu from "./GroupMenu/GroupMenu";
import { UtilityContext } from "../../../Context/UtilitiesContext";
import { IoArrowBack } from "react-icons/io5";
import GroupInput from "./GroupMenu/GroupInput";
import MultipleSelector from "./GroupMenu/MultipleSelector";
import { useSelector } from "react-redux";
import HandleSearch from "./GroupMenu/HandleSearch";

const SidebarHeader = ({ onlineUsers, usertyping }) => {

    const { openGroup, setOpenGroup, openWindow, setOpenWindow } = useContext(UtilityContext)


    return (
        <div className='flex justify-center flex-col items-center p16 relative'>
            {/* Container */}
            <div className="w-full flex justify-between items-center pb-5 text-button">
                <div>
                    <h1 className="text-2xl font-bold text-[#E9EDEF]">Chats</h1>
                </div>
                <div className="flex justify-center items-center gap-3 text-3xl text-[#AEBAC1]">
                    <AiOutlineWechat />
                    <CiMenuKebab className="cursor-pointer" onClick={() => setOpenGroup(!openGroup)} />
                </div>
            </div>

            {/* conditional rendering for create group */}

            {
                !openWindow ?
                    <>
                        <div className="w-full relative text-[#8696A0]">
                            <IoSearchSharp className="text-xl absolute top-1/2 -translate-y-1/2 left-4" />
                            <input type="text" className="bg-[#202C33] w-full h-9 rounded-lg" />
                            <h1 className="text-sm absolute top-1/2 -translate-y-1/2 left-16">Search</h1>
                        </div>
                        <div className="flex justify-start items-center w-full text-[#8696A0] py-3 gap-2">
                            <div className="bg-[#0A332C] text-[#39f1d3] py-1 px-4 rounded-[50px]">
                                <h1>All</h1>
                            </div>
                            <div className="bg-[#202C33] py-1 px-4 rounded-[50px]">
                                <h1>Unread</h1>
                            </div>
                            <div className="bg-[#202C33] py-1 px-4 rounded-[50px]">
                                <h1>Fvourite</h1>
                            </div>
                            <div className="bg-[#202C33] py-1 px-4 rounded-[50px]">
                                <h1>Groups</h1>
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full text-[#8696A0] p-2 gap-2">
                            <div className=" text-2xl w-[12%] text-[#39f1d3] rounded-[50px]">
                                <IoMdArchive />
                            </div>
                            <h1 className="text-[#E9EDEF] text-lg">Archived</h1>
                        </div>
                        <div className="w-full flex justify-between items-start border-gray-100">
                            {/* here the conversations */}
                            <Conversations usertyping={usertyping} onlineUsers={onlineUsers} />
                            <div>
                                {/* <h1 className="text-xs py-2">Yesterday</h1> */}
                            </div>
                        </div>
                    </> :
                    <HandleSearch />
            }

            {/* here we show menus for hamburger icon  */}

            {
                openGroup &&
                <div className="absolute top-10 right-5">
                    <GroupMenu />
                </div>
            }

        </div>

    )
}

export default SidebarHeader