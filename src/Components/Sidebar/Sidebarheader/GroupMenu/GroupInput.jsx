import React from 'react'

const GroupInput = ({ name, setName }) => {
    return (
        <div className="w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Enter text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-gray-500  focus:outline-none focus:border-gray-700 transition-colors duration-300 py-2 text-white"
            />
        </div>
    )
}

export default GroupInput