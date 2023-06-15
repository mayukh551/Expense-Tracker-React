import React from 'react'
import editIcon from '../../assets/editing.png';
import AccountUICard from '../UI/AccountUICard';

const ProfileCard: React.FC = () => {
    return (
        <AccountUICard>
            <img src={editIcon} alt="" className='w-5 absolute right-4 top-2 cursor-pointer' />

            <div>
                <h3 className='font-bold text-2xl mb-6'>Profile</h3>
                <div className='mb-6 flex flex-col space-y-8'>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg'>Name</div>
                        <div className='font-bold'>Mayukh Bhowmick</div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg'>Email</div>
                        <div className='font-bold'>mactavish171@gmail.com</div>
                    </div>
                    <div className='flex flex-row space-x-16'>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-lg'>Phone</div>
                            <div className='font-bold'>+918965574365</div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-lg'>Age</div>
                            <div className='font-bold'>26</div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountUICard>
    )
}

export default ProfileCard