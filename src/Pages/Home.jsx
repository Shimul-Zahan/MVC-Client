import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { getConversationId, getConversationName, getConversationPicture } from '../Utils/chat';
import Peer from 'simple-peer/simplepeer.min.js';


const callData = {
  socketId: '',
  receiveingCall: false,
  callEnded: false,
  name: '',
  picture: '',
}


const Home = () => {
  const { user } = useSelector((state) => state.user)
  const { files, activeConvo } = useSelector((state) => state.chat)
  // console.log(files);
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUser] = useState([])
  const [usertyping, setUserTyping] = useState(false)

  // for all types of callings
  const [call, setCall] = useState(callData)
  const [callStreaming, setCallStreaming] = useState()
  const { receiveingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false)
  const [show, setShow] = useState(false)
  const [callNow, setCallNow] = useState(false)
  const myVideoRef = useRef()
  const userVideoRef = useRef()
  // this connection ref for connect the call or disconnect the call
  const connectionRef = useRef()

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
      // console.log(onlineUsers);
      setOnlineUser(users)
    })
  }, [user])

  // get conversation
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConvo(user.access_token))
    }
  }, [user])


  //? -----------here setup media connection----------------
  const setupMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // console.log(stream, 'streaming here');
        setCallStreaming(stream);
      })
      .catch((err) => {
        console.error("Error accessing media devices", err);
      });
  };


  //? -----useEffect for setup media and socket listen-------
  useEffect(() => {
    setupMedia()
    socket.on('setup socket', (id) => {
      setCall({ ...call, socketId: id })
    })

    // listen socket for calling
    socket.on('call user', (data) => {
      setCall({
        ...call,
        // Caller socket id
        socketId: data.from,
        name: data.name,
        image: data.image,
        signal: data.signal,
        // now i am receiveing the call
        receiveingCall: true,
      })
    })

    socket.on('call ended', () => {
      console.log('go to this function in useEffect');
      setShow(false)
      setCall({ ...call, callEnded: true, receiveingCall: false })
      console.log(call, 'after re-arranging');
      myVideoRef.current.srcObject = null
      userVideoRef.current.srcObject = null
      connectionRef.current = null;
      connectionRef?.current?.destroy()
    })
  }, [])

  //? --------------call user function is here --------------
  const callUser = () => {
    enableMedia()
    // set a receiver caller details
    setCall({
      ...call,
      name: getConversationName(user, activeConvo.users),
      // id: getConversationId(user, activeConvo.users),
      picture: getConversationPicture(user, activeConvo.users),
    })

    const peer = new Peer({
      // who start call is called initiator
      initiator: true,
      trickle: false,
      stream: callStreaming,
    })
    // now send this peer signal to socket
    peer.on('signal', (data) => {
      socket.emit('call user', {
        userToCall: getConversationId(user, activeConvo.users), // Callee's ID
        signal: data, // Offer signal generated by the peer instance
        from: socketId, // Initiator's socket ID
        name: user.name, // Initiator's name
        image: user.image, // Initiator's profile picture
      })
    });

    // Set other user video to the object
    peer.on('stream', (stream) => {
      userVideoRef.current.srcObject = stream
    });

    // listen call accepted from receiver and process
    socket.on('call accepted', (signal) => {
      setCallAccepted(true)
      // connect the signal from receiver 
      peer.signal(signal)
    })

    // create a ref for further use
    connectionRef.current = peer;
  }


  //? -----------Ansewer the call----------------------------
  const answerCall = () => {
    enableMedia()
    setCallAccepted(true)
    // now need to create a pair
    const peer = new Peer({
      // receiver not the initiator/creator this call
      initiator: false,
      trickle: false,
      // stram from the receiver stream
      stream: callStreaming,
    })

    peer.on('signal', (data) => {
      socket.emit('answer call', {
        // Answer signal
        signal: data,
        // Send the signal to the caller's socket ID
        to: call.socketId
      })
    })
    peer.on('stream', (stream) => {
      userVideoRef.current.srcObject = stream;
    })
    peer.signal(call.signal)
    connectionRef.current = peer;
  }

  //?-------------End Call-----------------------------------
  const endCall = () => {
    setShow(false)
    setCall({ ...call, callEnded: true, receiveingCall: false })
    socket.emit('end call', call.socketId)
    connectionRef?.current?.destroy()
    connectionRef.current = null;
  }

  //? -----------Here we enable the media devices------------
  const enableMedia = () => {
    setShow(true);
    myVideoRef.current.srcObject = callStreaming
  };


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
          <Chats usertyping={usertyping} callUser={callUser} />
        </div>
      </div>

      {/* for calling */}

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          userVideoRef={userVideoRef}
          myVideoRef={myVideoRef}
          callStreaming={callStreaming}
          answerCall={answerCall}
          show={show}
          setShow={setShow}
          endCall={endCall}
          receiveingCall={receiveingCall}
        />
      </div>
    </div>
  )
}

export default Home