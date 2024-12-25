import React from 'react'

const CallArea = ({ name, image }) => {
    return (
        <div className='text-center text-white'>
            <h1 className='text-lg font-medium'>{name}</h1>
            <p className='text-sm font-medium'>timer here</p>
        </div>
    )
}

export default CallArea