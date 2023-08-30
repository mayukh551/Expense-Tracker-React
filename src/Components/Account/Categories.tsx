import React, { useState } from 'react'
import AccountUICard from '../UI/AccountUICard'

const Categories = () => {

    const [isEdit, setIsEdit] = useState(false);

    // create state variable for categories list
    const [categories, setCategories] = useState(['Work', 'Home', 'Personal', 'Others']);

    return (
        <AccountUICard>
            <h3 className='font-bold text-2xl mb-6'>Categories</h3>
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