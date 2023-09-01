import React, { useState } from 'react'
import AccountUICard from '../UI/AccountUICard'

const Categories = () => {

    const [isEdit, setIsEdit] = useState(false);

    // create state variable for categories list
    const [categories, setCategories] = useState(['Work', 'Home', 'Personal', 'Others']);

    const handleAddCategory=()=>{
        console.log("fuck u")
    }

    return (
        <AccountUICard>
            <div className='flex space-x-6 '>

            <h1 className='font-bold text-2xl mb-6 '>Categories</h1>

            <button className='mb-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow' onClick={handleAddCategory}>Add +</button>
            </div>

            <div className='flex flex-wrap space-x-9'>
                {categories.map((category, index) =>
                    <div className='py-2 px-10 shadow-lg border-2 rounded-md text-center'>
                        {category}
                    </div>
                )}
            </div>
        </AccountUICard>
    )
}

export default Categories