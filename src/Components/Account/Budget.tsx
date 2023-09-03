import React, { useEffect, useState } from 'react';
import editIcon from '../../assets/editing.png';
import AccountUICard from '../UI/AccountUICard'
import { TextField } from '@mui/material';
import editDiv from '../UI/editDiv';

const Budget: React.FC<{
    monthly: number,
    yearly: number,
    updateAccount: (data: any) => void
    setBudget: React.Dispatch<React.SetStateAction<{
        monthly: number;
        yearly: number;
    }>>,
}> = (props) => {

    const { monthly, yearly, setBudget } = props;

    const [prevMonthly, setPrevMonthly] = useState<number>();
    const [prevYearly, setPrevYearly] = useState<number>();

    const [isEdit, setIsEdit] = useState(false);
    const monthlybudget = monthly;
    const yearlybudget = yearly;

    const toggle = () => {
        setIsEdit(isEdit => !isEdit);
    }

    const onSave = () => {
        // set new data
        console.log(monthlybudget, yearlybudget);
        setIsEdit(false);
        props.updateAccount({
            budget: {
                monthly: monthlybudget,
                yearly: yearlybudget
            }
        });
    }

    const onCancel = () => {
        setBudget({ monthly: prevMonthly!, yearly: prevYearly! });
        setIsEdit(false);
    }

    const handleMontlyBudget = (e: React.ChangeEvent<HTMLInputElement>) => {

        let val: string | undefined = e.target.value;
        console.log(parseInt(val));

        if (prevMonthly === undefined) setPrevMonthly(monthly);
        if (prevYearly === undefined) setPrevYearly(yearly);

        if (Number.isNaN(parseInt(val))) setBudget({ monthly: 0, yearly: yearly });
        else setBudget({ monthly: parseInt(val), yearly: yearly });

    }

    const handleYearlyBudget = (e: React.ChangeEvent<HTMLInputElement>) => {

        let val: string | undefined = e.target.value;
        console.log(parseInt(val));

        if (prevMonthly === undefined) setPrevMonthly(monthly);
        if (prevYearly === undefined) setPrevYearly(yearly);

        if (Number.isNaN(parseInt(val))) setBudget({ monthly: monthly, yearly: 0 });
        else setBudget({ monthly: monthly, yearly: parseInt(val) });

    }

    return (
        <AccountUICard>
            <img src={editIcon} onClick={toggle} alt="" className='w-5 absolute right-4 top-2 cursor-pointer' />
            <h3 className='font-bold text-2xl mb-6'>Budget</h3>
            <div className='flex flex-row space-x-28'>
                <TextField
                    id="standard-read-only-input"
                    className='w-[15%]'
                    label="Monthly Budget"
                    InputProps={{
                        readOnly: !isEdit,
                    }}
                    variant="standard"
                    value={`${monthlybudget}`}
                    onChange={handleMontlyBudget}
                />
                <TextField
                    id="standard-read-only-input"
                    className='w-[15%]'
                    label="Yearly Budget"
                    InputProps={{
                        readOnly: !isEdit,
                    }}
                    variant="standard"
                    value={`${yearlybudget}`}
                    onChange={handleYearlyBudget}
                />
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
            {/* <editDiv isEdit={isEdit} onSave={onSave} toggle={toggle} /> */}
        </AccountUICard>
    )
}

export default Budget;