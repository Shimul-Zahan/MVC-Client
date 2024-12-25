import Select from 'react-select'

const MultipleSelector = ({ selectedUsers, searchResult, setSelectedUsers, search }) => {
    return (
        <Select className='w-full text-white'
            options={searchResult}
            onChange={setSelectedUsers}
            onKeyDown={(e) => search(e)}
            isMulti
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
                menu: (baseStyles) => ({
                    ...baseStyles,
                    background: 'transparent',
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