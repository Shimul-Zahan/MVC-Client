import React from 'react'

const CallArea = ({ name, image }) => {
    return (
        <div className='text-center text-white'>
            <h1 className='text-lg font-medium capitalize'>{name ? name : "Shimul Zahan..."}</h1>
            <p className='text-sm font-medium'>Ringing...</p>
            <p className='text-sm font-medium'>05:00</p>
        </div>
    )
}

export default CallArea