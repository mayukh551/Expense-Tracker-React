import React, { SetStateAction, useState } from 'react'
import AccountUICard from '../UI/AccountUICard'
import CloseIcon from '@mui/icons-material/Close';


const Categories: React.FC<{
    updateAccount: (data: any) => void;
    categories: string[];
    setCategory: SetStateAction<any>;
}> = ({ updateAccount, categories, setCategory }) => {

    const [isEdit, setIsEdit] = useState(false);

    const [newCategoryInput, setNewCategoryInput] = useState<boolean>(false);
    const [enteredCategory, setEnteredCategory] = useState<string>("");

    const handleAddCategory = () => {
        setNewCategoryInput(true);
        setIsEdit(true);
    }

    const handleDeleteCategory = (index: number) => {
        categories.splice(index, 1);
        if (categories.length === 0) setCategory([]);
        else setCategory([...categories]);
        setIsEdit(true);
    }

    const onSave = () => {
        // set new data
        console.log('On Save', enteredCategory);

        var updatedCategoryList = [...categories];

        if (enteredCategory.length !== 0) {
            updatedCategoryList = [...categories, enteredCategory];

            setCategory([...categories, enteredCategory]);
        }
        // reset states
        setIsEdit(false);
        setEnteredCategory("");
        setNewCategoryInput(false);

        localStorage.setItem('category', JSON.stringify(updatedCategoryList));

        updateAccount({ category: updatedCategoryList });
    }

    const onCancel = () => {

        // reset states
        setIsEdit(false);
        setEnteredCategory("");
        setNewCategoryInput(false);
    }


    return (
        <AccountUICard>
            <div className='flex space-x-6 '>

                <h1 className='font-bold text-2xl mb-6 '>Categories</h1>
                {newCategoryInput &&
                    <div className='flex flex-row'>
                        <input className='mb-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'
                            value={enteredCategory}
                            onChange={(e) => setEnteredCategory(e.target.value)} />
                    </div>
                }
                {!newCategoryInput && <button className='mb-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'
                    onClick={handleAddCategory}>
                    Add +
                </button>}
            </div>

            <div className='flex flex-wrap'>
                {categories.map((category, index) =>
                    <div className='relative py-2 px-10 shadow-lg border-2 rounded-md text-center w-fit mr-10 mb-5'>
                        <div className='absolute right-1 top-0' onClick={() => handleDeleteCategory(index)}>
                            <CloseIcon fontSize='small' sx={{ cursor: 'pointer', width: '15px' }} />
                        </div>
                        {category}
                    </div>
                )}
                {categories.length === 0 && <div className='text-center text-gray-400'>No categories added yet</div>}
            </div>
            {isEdit && <div className='mt-7 flex flex-row space-x-7'>
                <button type="button"
                    className='px-6 py-2 rounded-md bg-purple-700 hover:bg-blue-500 text-white transition-colors duration-100'
                    onClick={onSave}
                >
                    Save
                </button>
                <button type="button"
                    className='px-6 py-2 rounded-md bg-purple-700 hover:bg-blue-500 text-white transition-colors duration-100'
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>}
        </AccountUICard>
    )
}

export default Categories