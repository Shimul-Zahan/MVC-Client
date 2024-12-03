import React from 'react'
import MessagePage from '../Message/Message'

const Chats = () => {
    const click = true
    return (
        <>
            {click ? <MessagePage /> :
                <div className='w-full h-full select-none border-l'>
                    <div className='flex justify-center items-center text-center h-full'>
                        <div>
                            <h1 className='text-xl'>Bok Bok Web</h1>
                            <p>Send and received message without keeping online. <br /> Link four devices at a time</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Chats