import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import SelectBtn from '../UI/SelectBtn';
import LastNdays from './LastNdays';
import CachedIcon from '@mui/icons-material/Cached';

interface Props {
    hasExpenses: boolean;
    chosenCounter: number;
    expenseLen: number;
    setIsConfirmDelete: (value: boolean) => void;
    enableOutofBudget: boolean;
    setEnableOutofBudget: (value: boolean) => void;
    setDaysRange: (value: number) => void;
    userSelectedMonth: string;
    updateSelectedMonth: (value: string) => void;
    userSelectedYear: string;
    updateSelectedYear: (value: string) => void;
    sortOrder: string;
    updateSortOrder: (value: string) => void;
    monthList: string[];
    yearList: number[];
    refresh: () => void;
}

const ExpenseControls: React.FC<Props> = (props) => {
    const {
        hasExpenses,
        chosenCounter,
        expenseLen,
        setIsConfirmDelete,
        enableOutofBudget,
        setEnableOutofBudget,
        setDaysRange,
        userSelectedMonth,
        updateSelectedMonth,
        userSelectedYear,
        updateSelectedYear,
        sortOrder,
        updateSortOrder,
        monthList,
        yearList,
        refresh
    } = props;

    return (
        <div className="flex flex-col text-start mb-3 space-y-3 items-center justify-between sm:flex-row sm:space-y-0 sm:space-x-6">
            <div>
                {hasExpenses && (
                    <button
                        className={`${chosenCounter === 0 ? 'bg-gray-600 cursor-default' : 'bg-red-600 hover:bg-red-700 cursor-pointer'} font-medium  text-white py-2 px-3 rounded-md flex flex-row items-center space-x-1`}
                        onClick={() => setIsConfirmDelete(true)}
                        disabled={chosenCounter === 0}
                    >
                        <span className="text-sm">{`Delete ${expenseLen} ${expenseLen > 1 ? 'expenses' : 'expense'}`}</span>
                    </button>
                )}
            </div>
            <div className="flex flex-row space-x-2 place-items-center cursor-pointer"
                onClick={() => setEnableOutofBudget(!enableOutofBudget)}
                style={{ "userSelect": "none" }}
            >
                <span className={`bg-red-500 h-4 w-10 inline-block rounded-sm`}></span>
                <span className={`font-semibold ${enableOutofBudget ? 'text-white' : 'line-through text-gray-400'}`}> Out of Budget </span>
            </div>


            <div className="flex flex-row space-x-2">
                <SelectBtn
                    options={monthList}
                    val={userSelectedMonth}
                    selectEventHandler={(event: SelectChangeEvent<string>) => { updateSelectedMonth(event.target.value); }}
                    style={{ height: '40px', backgroundColor: 'rgb(75 85 99 / 1)', font: 'inherit', color: "white", fontSize: '14px' }}
                />
                <SelectBtn
                    options={yearList}
                    val={userSelectedYear}
                    selectEventHandler={(event: SelectChangeEvent<string>) => { updateSelectedYear(event.target.value); }}
                    style={{ height: '40px', backgroundColor: 'rgb(75 85 99 / 1)', font: 'inherit', color: "white", fontSize: '14px' }}
                />
            </div>

            <div className="flex flex-row space-x-2">
                <LastNdays setRange={setDaysRange} />
                <SelectBtn
                    options={['Recent', 'Oldest', 'High - Low', 'Low - High', 'A - Z', 'Z - A']}
                    val={sortOrder}
                    selectEventHandler={(event: SelectChangeEvent<string>) => { updateSortOrder(event.target.value); }}
                    style={{ height: '40px', backgroundColor: 'rgb(75 85 99 / 1)', font: 'inherit', color: "white", fontSize: '14px' }}
                />
            </div>
            <div 
            className='flex flex-row space-x-2 cursor-pointer p-2 rounded-md'
            style={{ backgroundColor: 'rgb(75 85 99 / 1)'}}>
                <CachedIcon
                    className="cursor-pointer"
                    onClick={refresh}
                    style={{ color: "white" }}
                />
            </div>
        </div>
    );
};

export default ExpenseControls;