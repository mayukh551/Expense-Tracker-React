import React from 'react';

const AccountUICard: React.FC<{
    className?: string;
    children: React.ReactNode | React.ReactNode[]
}> = ({ children }) => {
    return (
        <div className='mt-12 mx-auto py-6 px-5 shadow-xl w-[90%] md:w-[70%] lg:w-[50%] relative bg-white rounded-md'>
            {children}
        </div>
    )
}

export default AccountUICard;