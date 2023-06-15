import React from 'react';
import editIcon from '../../assets/editing.png';
import AccountUICard from '../UI/AccountUICard'
import { TextField } from '@mui/material';

const Budget = () => {
    return (
        <AccountUICard>
            <img src={editIcon} alt="" className='w-5 absolute right-4 top-2 cursor-pointer' />
            <h3 className='font-bold text-2xl mb-6'>Budget</h3>
            <div className='flex flex-col space-y-6'>
                <TextField
                    id="standard-read-only-input"
                    className='w-[15%]'
                    label="Monthly Budget"
                    defaultValue="$ 5684"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                />
                <TextField
                    id="standard-read-only-input"
                    className='w-[15%]'
                    label="Yearly Budget"
                    defaultValue="$ 35000"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                />
            </div>
        </AccountUICard>
    )
}

export default Budget;