import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../Shared/Avatar";
import { IoIosVideocam } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getConvoMessages, sendMessage } from "../features/chatSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPickerApp from "./Emoji/EmojiPicker";
import Attachments from "./Attachments/Attachments";
import SocketContext from "../Context/SocketContext";
import SyncLoader from "react-spinners/SyncLoader";
import FilesPreview from "../Preview/Files/FilesPreview";

const MessagePage = ({ name, picture, usertyping }) => {
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [typing, setTyping] = useState(false)
    const dispatch = useDispatch()
    const textReference = useRef()
    const endRef = useRef()
    const [showAttachments, setShowAttachments] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const socket = useContext(SocketContext);

    // get active convo id here
    const { activeConvo, messages, files } = useSelector((state, error) => state?.chat)
    const { user } = useSelector((state, error) => state?.user)

    // handle typing
    const onchangeTypingHandler = (e) => {
        setInput(e.target.value)
        if (!typing) {
            setTyping(true)
            socket.emit('typing', activeConvo._id)
        }
        let lastTypingTime = new Date().getTime()
        let timer = 2000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDef = timeNow - lastTypingTime
            if (timeDef >= timer && typing) {
                socket.emit('stop typing', activeConvo?._id)
                setTyping(false)
            }
        }, timer);
    }

    // values for get the message
    const values = {
        token: user?.access_token,
        convo_id: activeConvo?._id
    }

    // values for send the message
    const message_values = {
        message: input,
        convo_id: activeConvo?._id,
        files: [],
        token: user?.access_token,
    }

    const sendMessages = async () => {
        if (input || image) {
            let res = await dispatch(sendMessage(message_values))
            socket.emit('send message', res.payload)
            setInput("");
            setImage(null);
        }
    };

    // get message using convo id
    useEffect(() => {
        if (activeConvo?._id) {
            dispatch(getConvoMessages(values))
        }
    }, [activeConvo])

    // for autoscroll
    const scrollToBottom = () => {
        // endRef.current.scrollIntoView({ behavior: "smooth" });
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("endRef is null; check its placement in the DOM.");
        }
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])


    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 px-5 pr-8 gap-4 flex justify-between items-center">
                <div className="gap-4 flex justify-start items-center">
                    <img src={picture} alt="" className="h-12 w-12 rounded-full" />
                    <div className="">
                        <h1 className="text-lg">{name}</h1>
                        <h1 className="text-sm">{usertyping ? <SyncLoader color="#fff" size={8} /> : 'Online'}</h1>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <IoIosVideocam className="text-3xl shadow rounded-l" />
                    <IoMdSearch className="text-2xl shadow rounded-l" />
                    <CgMenuGridO className="text-2xl shadow rounded-l" />
                </div>
            </div>

            {/* Message List */}
            {/* Preview files here */}
            {
                files.length > 0 ?
                    <FilesPreview />
                    :
                    <>
                        <div className="flex-1 p-4 overflow-y-scroll">
                            {messages && messages.map((msg, index) => {
                                const isMyMessage = msg?.sender?._id === user?._id;
                                {/* console.log(msg.sender._id)
                    console.log(msg.user?._id) */}
                                return (
                                    <div
                                        key={msg._id} // Use unique _id for the key
                                        className={`mb-4 flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs p-3 rounded-lg ${isMyMessage
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            {/* Display text message */}
                                            {msg.message && <p>{msg.message}</p>}
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Scroll Anchor */}
                            <div ref={endRef}></div>
                        </div>
                        <div className="flex relative items-center p-4 bg-blue-600 text-black border-t text-lg border-gray-300">

                            {/* Emoji picker here */}
                            <EmojiPickerApp
                                input={input} setInput={setInput} textReference={textReference}
                                showPicker={showPicker} setShowPicker={setShowPicker}
                                setShowAttachments={setShowAttachments}
                            />

                            {/* Attachments here */}
                            <Attachments
                                showAttachments={showAttachments} setShowAttachments={setShowAttachments}
                                setShowPicker={setShowPicker}
                            />

                            <input
                                ref={textReference}
                                type="text"
                                value={input}
                                onChange={onchangeTypingHandler}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <button
                                onClick={sendMessages}
                                className="bg-blue-600 text-white px-4 py-2 ml-3 rounded-lg"
                            >
                                <IoSend />
                            </button>
                        </div>
                    </>
            }
        </div>
    );
};

export default MessagePage;
