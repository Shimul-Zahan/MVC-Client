import React from 'react'
import { SidebarHeader } from './Sidebarheader'

const Sidebar = ({ onlineUsers, usertyping }) => {
    return (
        <div className='w-full h-full select-none'>
            {/* sidebar header */}
            <SidebarHeader usertyping={usertyping} onlineUsers={onlineUsers} />
        </div>
    )
}

export default Sidebar