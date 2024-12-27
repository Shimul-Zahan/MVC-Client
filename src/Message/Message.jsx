import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../Shared/Avatar";
import { IoIosVideocam } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { getConvoMessages, sendMessage } from "../features/chatSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPickerApp from "./Emoji/EmojiPicker";
import Attachments from "./Attachments/Attachments";
import SocketContext from "../Context/SocketContext";
import SyncLoader from "react-spinners/SyncLoader";
import FilesPreview from "../Preview/Files/FilesPreview";
import { FaFilePdf } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaFileDownload } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";



const MessagePage = ({ name, picture, usertyping, callUser }) => {
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

    console.log("active convo here from message page", messages);

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

    useEffect(() => {
        if (messages?.length > 0) {
            scrollToBottom();
        }
    }, [messages, files]);

    // for autoscroll
    const scrollToBottom = () => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("endRef is null; check its placement in the DOM.");
        }
    }

    // Function to render file previews
    const renderFilePreview = (file) => {

        if (file?.type?.includes("image")) {
            return <img src={file?.file?.secure_url} alt="Image" className="max-w-xs max-h-60 object-cover rounded-sm" />
        }
        if (file?.type?.includes("video")) {
            return (
                <video
                    controls
                    className="rounded-sm w-full"
                    src={file?.file?.secure_url}
                >
                    Your browser does not support the video tag.
                </video>
            );
        }

        // Handling document files (PDF, DOCX, etc.)
        if (file?.type?.includes("pdf")) {
            return (
                <div className="border py-1 px-2 rounded-lg flex justify-between items-center w-full gap-10">
                    <div className="flex justify-start items-center gap-4">
                        <FaFilePdf className="text-3xl font-bold text-red-500" />
                        <div>
                            <h1 className="text-sm">{file?.file?.display_name}</h1>
                            <div className="flex justify-start items-center gap-1">
                                <h1 className="text-xs">{Math.floor(file?.file?.bytes / 1024 / 1024)}MB</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href={file?.file?.secure_url} download target="_blank">
                            <FaFileDownload className="text-3xl font-bold" />
                        </a>
                    </div>
                </div>
            )
        }
        if (file?.type?.includes("vnd.openxmlformats-officedocument.wordprocessingml.document"
        )) {
            return (
                <div className="border py-1 px-2 rounded-lg flex justify-between items-center w-full gap-10">
                    <div className="flex justify-start items-center gap-4">
                        <FaFileWord className="text-3xl font-bold text-black" />
                        <div>
                            <h1 className="text-sm">{file?.file?.display_name}</h1>
                            <div className="flex justify-start items-center gap-1">
                                <h1 className="text-xs">{Math.floor(file?.file?.bytes / 1024 / 1024)}MB</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href={file?.file?.secure_url} download target="_blank">
                            <FaFileDownload className="text-3xl font-bold" />
                        </a>
                    </div>
                </div>
            )
        }

        return null;
    };


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
                    <button onClick={() => callUser()}>
                        <IoIosVideocam className="text-3xl shadow rounded-l" />
                    </button>
                    <button>
                        <IoMdSearch className="text-2xl shadow rounded-l" />
                    </button>
                    <button>
                        <CgMenuGridO className="text-2xl shadow rounded-l" />
                    </button>
                </div>
            </div>

            {/* Message List */}
            {/* Preview files here */}
            {
                files.length > 0 ? (
                    <FilesPreview />
                )
                    :
                    <>
                        <div className="flex-1 p-4 overflow-y-scroll">
                            {messages && messages.map((msg, index) => {
                                const isMyMessage = msg?.sender?._id === user?._id;
                                return (
                                    <div
                                        key={index}
                                        className={`mb-4 flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex flex-col ${isMyMessage ? "items-end" : ""}`}>
                                            {/* Display text message */}
                                            <div className="flex justify-start items-center gap-5">
                                                {
                                                    !isMyMessage && msg?.conversation.isGroup &&
                                                    <div>
                                                        <img src={msg?.sender?.image} alt="" className="h-8 w-8 rounded-full" />
                                                    </div>
                                                }
                                                <div className={`max-w-xs px-3 py-2 rounded-lg ${isMyMessage
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                                    }`}>
                                                    {(msg.message || "").length > 0 && <p>{msg.message}</p>}
                                                </div>
                                            </div>

                                            {/* Render image or video preview */}
                                            {msg?.files && msg?.files.length > 0 && msg?.files.map((file, idx) => (
                                                <div className="flex justify-start items-center gap-5">
                                                    {
                                                        !isMyMessage && msg?.conversation.isGroup &&
                                                        <div>
                                                            <img src={msg?.sender?.image} alt="" className="h-8 w-8 rounded-full" />
                                                        </div>
                                                    }
                                                    <div key={idx} className="mt-2">
                                                        {renderFilePreview(file)}
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                );
                            })}
                            {/* Scroll Anchor */}
                            <div ref={endRef}></div>
                        </div>

                        {/* for actions here */}
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
