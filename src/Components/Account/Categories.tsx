import React from 'react'
import AccountUICard from '../UI/AccountUICard'

const Categories = () => {
    return (
        <AccountUICard>
            <h3 className='font-bold text-2xl mb-6'>Categories</h3>
            <div className='flex flex-wrap space-x-9'>
                <div className='py-2 px-10 shadow-lg border-2 rounded-md text-center'>
                    Work
                </div>
                <div className='py-2 px-10 shadow-lg border-2 rounded-md text-center'>
                    Home
                </div>
            </div>
        </AccountUICard>
    )
}

export default Categories