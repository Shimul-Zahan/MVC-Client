import React from 'react'

const Avatar = () => {
    return (
        <div className="relative">
            <img
                width={500}
                height={500}
                className="size-10 rounded-full bg-slate-500 object-cover"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                alt="avatar navigate ui"
            />
            <span className="absolute bottom-[2px] right-0 size-3 rounded-full border-[2px] border-white bg-green-500"></span>
        </div>
    )
}

export default Avatar