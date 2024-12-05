import React, { useEffect, useRef, useState } from "react";
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

const MessagePage = ({ name, picture }) => {
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch()
    const me = true
    const textReference = useRef()
    const endRef = useRef()
    const [showAttachments, setShowAttachments] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

    // get active convo id here
    const { activeConvo, messages } = useSelector((state, error) => state?.chat)
    const { user } = useSelector((state, error) => state?.user)

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
            await dispatch(sendMessage(message_values))
            console.log(input);
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
        endRef.current.scrollIntoView({ behavior: "smooth" });
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
                        <h1 className="text-sm">typing</h1>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <IoIosVideocam className="text-3xl shadow rounded-l" />
                    <IoMdSearch className="text-2xl shadow rounded-l" />
                    <CgMenuGridO className="text-2xl shadow rounded-l" />
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 p-4 overflow-y-scroll">
                {messages && messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${me ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg ${me
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {/* <p className="font-bold">{msg.sender}</p> */}
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Uploaded"
                                    className="mb-2 max-h-40 rounded-lg"
                                />
                            )}
                            {msg.message && <p>{msg.message}</p>}
                        </div>
                    </div>
                ))}
                {/* div for automatic scroll */}
                <div ref={endRef}></div>
            </div>

            {/* Input Area */}
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
                    onChange={(e) => setInput(e.target.value)}
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
        </div>
    );
};

export default MessagePage;
