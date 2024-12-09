import React from 'react'
import MessagePage from '../Message/Message'
import { useSelector } from 'react-redux'

const Chats = ({ usertyping, callUser }) => {

    const { activeConvo } = useSelector((state, error) => state?.chat)
    // console.log(activeConvo);
    const { name, picture } = activeConvo

    return (
        <>
            {activeConvo._id ? <MessagePage callUser={callUser} usertyping={usertyping} name={name} picture={picture} /> :
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