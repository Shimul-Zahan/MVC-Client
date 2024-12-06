import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { BiSolidFileTxt } from "react-icons/bi";
import { RiFileVideoFill } from "react-icons/ri";
import { MdAudioFile } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { TbFileUnknown } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../features/chatSlice";
import { useState } from "react";
import { formatFileType } from "../../Utils/FormatFileType";

const FilesPreview = () => {

    const dispatch = useDispatch()
    const [input, setInput] = useState("");
    const { files } = useSelector((state) => state.chat)
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);

    // clear files
    const handleClearFiles = () => {
        dispatch(clearFiles())
    }

    // Map file types to appropriate icons
    const getFileIcon = (type) => {
        if (type.startsWith("image")) return <FaImage className="text-3xl" />;
        if (type === "application/pdf") return <FaFilePdf className="text-3xl" />;
        if (type === "text/plain") return <BiSolidFileTxt className="text-3xl" />;
        if (type.startsWith("video")) return <RiFileVideoFill className="text-3xl" />;
        if (type.startsWith("audio")) return <MdAddBox className="text-3xl" />;
        return <TbFileUnknown className="text-3xl" />;
    };

    // For Input handle here
    const onchangeTypingHandler = (e) => {
        setInput(e.target.value)
    }

    console.log(input, 'from files');


    return (
        <div className="flex-1 bg-[#101A20] p-4 overflow-y-scroll justify-center items-center">
            <div>
                <div className="flex justify-between items-center">
                    {/* close button */}
                    <button onClick={handleClearFiles}>
                        <MdOutlineCancelScheduleSend className="text-3xl" />
                    </button>
                    {/* download button */}
                    <button>
                        <FaCloudDownloadAlt className="text-3xl" />
                    </button>
                </div>
                {/* for preview here and input here */}
                <div className="space-y-2">
                    {/* files name here */}
                    <div className="w-full flex justify-center items-center py-5">
                        {files[0]?.file?.name}
                    </div>
                    {/* File preview */}
                    {files[0]?.file?.type?.startsWith("image") ? (
                        <div className="flex justify-center items-center h-[300px] w-full overflow-hidden">
                            <img src={files[selectedFileIndex]?.fileData} alt="" className="h-full w-[400px]" />
                        </div>
                    ) : (
                        <div className="w-full h-[300px] flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center gap-5">
                                {getFileIcon(files[selectedFileIndex]?.file?.type)}
                                <h1 className="text-3xl font-medium">No Preview Available</h1>
                                <div className="flex justify-center items-center gap-2">
                                    <h1>{files[selectedFileIndex]?.file?.size} KB -</h1>
                                    <h1>{formatFileType(files[0]?.file?.type)}</h1>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* input here */}
                    <div className="flex justify-center items-center py-5">
                        <input onChange={onchangeTypingHandler}
                            type="text" className="w-[70%] py-2 px-3 bg-[#2B3B45] rounded-lg" placeholder="Add a caption" />
                    </div>

                </div>
                <hr className="bg-gray-700 h-[0.5px] border-0 my-4" />
                {/* Show all selected image here */}
                <div className="flex justify-center items-center gap-1 relative">
                    {files &&
                        files.map((file, index) => (
                            <div
                                onClick={() => setSelectedFileIndex(index)}
                                key={index}
                                className="border-gray-700 p-1 border-2 rounded-lg cursor-pointer h-16 w-16 flex justify-center items-center"
                            >
                                {file?.file?.type?.startsWith("image") ? (
                                    <img src={file?.fileData} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    getFileIcon(file?.file?.type)
                                )}
                            </div>
                        ))}
                    {/* add button here */}
                    <div className=" border-gray-700 border-2 rounded-lg cursor-pointer h-16 w-16 flex justify-center items-center">
                        <MdAddBox className="text-5xl" />
                    </div>
                    <button className="cursor-pointer h-16 w-16 flex justify-center items-center absolute right-0">
                        <div className="relative bg-green-500 w-full h-full rounded-full flex justify-center items-center">
                            <IoSend className="text-4xl" />
                            <p className="absolute top-0 right-0 h-6 w-6 text-black text-sm flex justify-center items-center bg-white rounded-full">{files && files.length}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilesPreview