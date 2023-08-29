const editDiv: React.FC<{
    onSave: (save: boolean) => void,
    toggle: (cond: boolean) => void,
    isEdit: boolean,
    children: React.ReactNode | React.ReactNode[]
}> = (props) => {

    const isEdit = props.isEdit;

    return (
        <div className='mt-7 flex flex-row space-x-7'>
            <button type="button"
                onClick={props.onSave.bind(this, true)}
                className={`px-6 py-2 rounded-md ${isEdit ? 'bg-gray-500' : 'bg-purple-700 hover:bg-blue-500'} text-white transition-colors duration-100`}>
                Save
            </button><button type="button"
                onClick={props.toggle.bind(this, false)}
                className='px-6 py-2 rounded-md bg-purple-700 hover:bg-blue-500 text-white transition-colors duration-100'>
                Cancel
            </button>
        </div >
    )
}

export default editDiv;