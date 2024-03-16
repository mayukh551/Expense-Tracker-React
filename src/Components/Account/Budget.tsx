import React, { useState } from 'react';
import editIcon from '../../assets/editing.png';
import AccountUICard from '../UI/AccountUICard'
import { TextField } from '@mui/material';

const Budget: React.FC<{
    monthly: number,
    yearly: number,
    item: number,
    updateAccount: (data: any) => void
    setBudget: React.Dispatch<React.SetStateAction<{
        monthly: number;
        yearly: number;
        item: number;
    }>>,
}> = (props) => {

    const { monthly, yearly, item, setBudget } = props;

    const [prevMonthly, setPrevMonthly] = useState<number>();
    const [prevYearly, setPrevYearly] = useState<number>();
    const [prevItem, setPrevItem] = useState<number>();

    const [isEdit, setIsEdit] = useState(false);
    const monthlybudget = monthly;
    const yearlybudget = yearly;
    const itemBudget = item;

    const toggle = () => {
        setIsEdit(isEdit => !isEdit);
    }

    const onSave = () => {
        // set new data
        console.log(monthlybudget, yearlybudget);
        setIsEdit(false);

        localStorage.setItem('budget', JSON.stringify({ monthly: monthlybudget, yearly: yearlybudget, item: itemBudget }));

        props.updateAccount({
            budget: {
                monthly: monthlybudget,
                yearly: yearlybudget,
                item: itemBudget
            }
        });
    }

    const onCancel = () => {
        setBudget({ monthly: prevMonthly!, yearly: prevYearly!, item: prevItem! });
        setIsEdit(false);
    }

    const handleMontlyBudget = (e: React.ChangeEvent<HTMLInputElement>) => {

        let val: string | undefined = e.target.value;
        console.log(parseInt(val));

        if (prevMonthly === undefined) setPrevMonthly(monthly);
        if (prevYearly === undefined) setPrevYearly(yearly);
        if (prevItem === undefined) setPrevItem(item);

        if (Number.isNaN(parseInt(val))) setBudget({ monthly: 0, yearly: yearly, item: item });
        else setBudget({ monthly: parseInt(val), yearly: yearly, item: item });

    }

    const handleYearlyBudget = (e: React.ChangeEvent<HTMLInputElement>) => {

        let val: string | undefined = e.target.value;
        console.log(parseInt(val));

        if (prevMonthly === undefined) setPrevMonthly(monthly);
        if (prevYearly === undefined) setPrevYearly(yearly);
        if (prevItem === undefined) setPrevItem(item);

        if (Number.isNaN(parseInt(val))) setBudget({ monthly: monthly, yearly: 0, item: item });
        else setBudget({ monthly: monthly, yearly: parseInt(val), item: item });

    }

    const handleItemBudget = (e: React.ChangeEvent<HTMLInputElement>) => {

        let val: string | undefined = e.target.value;

        if (prevMonthly === undefined) setPrevMonthly(monthly);
        if (prevYearly === undefined) setPrevYearly(yearly);
        if (prevItem === undefined) setPrevItem(item);

        if (Number.isNaN(parseInt(val))) setBudget({ monthly: monthly, yearly: yearly, item: 0 });
        else setBudget({ monthly: monthly, yearly: yearly, item: parseInt(val) });

    }



    return (
        <AccountUICard>
            <img src={editIcon} onClick={toggle} alt="" className='w-5 absolute right-4 top-2 cursor-pointer' />
            <h3 className='font-bold text-2xl mb-6'>Budget</h3>
            <div className='flex flex-row space-x-28'>

                {/* For Monthly Budget */}

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

                {/* For Yearly Budget */}

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

                {/* For Item Budget */}
                <TextField
                    id="standard-read-only-input"
                    className='w-[15%]'
                    label="Item Budget"
                    InputProps={{
                        readOnly: !isEdit,
                    }}
                    variant="standard"
                    value={`${itemBudget}`}
                    onChange={handleItemBudget}
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