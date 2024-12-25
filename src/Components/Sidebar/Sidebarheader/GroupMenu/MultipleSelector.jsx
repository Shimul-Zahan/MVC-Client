import Select from 'react-select'

const MultipleSelector = ({ selectedUsers, searchResult, setSelectedUsers, search }) => {
    return (
        <Select className='w-full text-white'
            options={searchResult}
            onChange={setSelectedUsers}
            onKeyDown={(e) => search(e)}
            isMulti
            formatOptionLabel={(user) => (
                <div className='flex items-center gap-1'>
                    <img
                        src={user.image}
                        alt="profile image"
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <span className='text-white'>{user.label}</span>
                </div>
            )}
            placeholder="Search or Select users"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    background: 'transparent',
                    color: 'white',
                    boxShadow: state.isFocused ? 'none' : 'none',
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: 'white',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: 'white',
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    color: 'white',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    background: 'transparent',
                    color: 'white'
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: 'white',
                }),
            }}
        />
    )
}

export default MultipleSelector