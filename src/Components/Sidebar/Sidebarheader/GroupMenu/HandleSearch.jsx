import React, { useContext, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import GroupInput from './GroupInput'
import MultipleSelector from './MultipleSelector'
import { useDispatch, useSelector } from 'react-redux'
import { UtilityContext } from '../../../../Context/UtilitiesContext'
import axios from 'axios'
import { createGroupConversation } from '../../../../features/chatSlice'

const HandleSearch = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const { user } = useSelector((state) => state.user)
    const { status } = useSelector((state) => state.chat)
    const [searchResult, setSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { openGroup, setOpenGroup, openWindow, setOpenWindow } = useContext(UtilityContext)

    const search = async (e) => {
        if (e.target.value && e.key === "Enter") {
            e.preventDefault();
            setSearchResult([])
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/user?search=${e.target.value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`
                        },
                    }
                )
                console.log(data, "search results here");
                if (data?.length > 0) {
                    let temporary_array = []
                    data?.forEach(user => {
                        let temp = {
                            value: user._id,
                            label: user.name,
                            image: user.image,
                        }
                        temporary_array.push(temp)
                    })
                    setSearchResult(temporary_array)
                } else {
                    setSearchResult([])
                }
            } catch (error) {
                console.log(error.response.data.error.message);
            }
        } else {
            setSearchResult([])
        }
    }


    const createGroupAction = async () => {
        console.log(selectedUsers, name);
        let users = []
        selectedUsers.forEach(user => users.push(user.value))
        let values = {
            name,
            users,
            token: user?.access_token,
        }
        let groupConvo = await dispatch(createGroupConversation(values))
        console.log(groupConvo);
    }

    return (
        <div className="w-full space-y-5">
            <div className="flex justify-between items-center pr-5">
                <IoArrowBack onClick={() => setOpenWindow(false)} className="text-2xl cursor-pointer" />
                <button className='bg-green-500 py-1 px-3 rounded-lg'
                    onClick={() => createGroupAction()}
                >Group Group</button>
            </div>

            {/* for search icons */}
            <GroupInput name={name} setName={setName} />

            {/* Multiple users selection */}
            <MultipleSelector
                searchResult={searchResult}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                search={search}
            />

        </div>
    )
}

export default HandleSearch