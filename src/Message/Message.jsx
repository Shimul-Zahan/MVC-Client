import React, { useEffect, useState } from "react";
import Avatar from "../Shared/Avatar";
import { IoIosVideocam } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getConvoMessages } from "../features/chatSlice";

const MessagePage = ({ name, picture }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch()
    const me = true

    // get active convo id here
    const { activeConvo, convo_messages } = useSelector((state, error) => state?.chat)
    const { user } = useSelector((state, error) => state?.user)
    console.log(activeConvo?._id, "from message");
    console.log(convo_messages, "from message");

    const sendMessage = () => {
        if (input || image) {
            setMessages([...messages, { text: input, image }]);
            setInput("");
            setImage(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const values = {
        token: user?.access_token,
        convo_id: activeConvo?._id
    }

    // get message using convo id
    useEffect(() => {
        if (activeConvo?._id) {
            dispatch(getConvoMessages(values))
        }
    }, [activeConvo])

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
                {convo_messages && convo_messages?.map((msg, index) => (
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
            </div>

            {/* Input Area */}
            <div className="flex relative items-center p-4 bg-blue-600 text-black border-t text-lg border-gray-300">
                <IoMdAdd className="text-3xl text-black" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 px-3"
                >
                    <div className="flex justify-center items-center gap-2">
                        <PiImagesSquareLight className="text-3xl text-black" />
                    </div>
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 ml-3 rounded-lg"
                >
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default MessagePage;
