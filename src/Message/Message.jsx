import React, { useState } from "react";
import Avatar from "../Shared/Avatar";
import { IoIosVideocam } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const MessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);

    // Dummy conversation data
    const conversation = [
        { sender: "User 1", text: "Hi, how are you?", image: null },
        { sender: "User 2", text: "I'm good, thanks! How about you?", image: null },
        { sender: "User 1", text: "Doing great! Did you finish the project?", image: null },
        { sender: "User 2", text: "Yes, I sent it this morning.", image: null },
        { sender: "User 1", text: "Perfect! Let's plan the next steps.", image: null },
        { sender: "User 2", text: "Sure, I was thinking we could discuss it tomorrow.", image: null },
        { sender: "User 1", text: "Sounds good! Catch you tomorrow.", image: null },
        { sender: "User 2", text: "Alright, see you!", image: null },
        { sender: "User 1", text: "Hi, how are you?", image: null },
        { sender: "User 2", text: "I'm good, thanks! How about you?", image: null },
        { sender: "User 1", text: "Doing great! Did you finish the project?", image: null },
        { sender: "User 2", text: "Yes, I sent it this morning.", image: null },
        { sender: "User 1", text: "Perfect! Let's plan the next steps.", image: null },
        { sender: "User 2", text: "Sure, I was thinking we could discuss it tomorrow.", image: null },
        { sender: "User 1", text: "Sounds good! Catch you tomorrow.", image: null },
        { sender: "User 2", text: "Alright, see you!", image: null },
    ];

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

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 px-5 pr-10 gap-4 flex justify-between items-center">
                <div className="gap-4 flex justify-start items-center">
                    <Avatar />
                    <div className="">
                        <h1 className="text-lg">Shimul Zahan</h1>
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
                {conversation?.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${msg.sender === "User 1" ? "justify-start" : "justify-end"
                            }`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg ${msg.sender === "User 1"
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
                            {msg.text && <p>{msg.text}</p>}
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
