import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import SelectBtn from '../UI/SelectBtn';
import LastNdays from './LastNdays';
import CachedIcon from '@mui/icons-material/Cached';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

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

    const downloadCSV = () => {
        console.log('downloadCSV');
        // Construct query parameters for the current month and year
        const queryParams = new URLSearchParams({
            month: (monthList.indexOf(userSelectedMonth) + 1).toString().padStart(2, '0'),
            year: userSelectedYear
        }).toString();

        console.log(queryParams);

        // Append query parameters to the URL
        const url = `${process.env.REACT_APP_SERVER_URL}/expenses/export?${queryParams}`;
        console.log(url);
        axios.get(url, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .then(data => {
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'expenses.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    }

    const downloadExcel = () => {
        console.log('downloadExcel');
        const queryParams = new URLSearchParams({
            month: (monthList.indexOf(userSelectedMonth) + 1).toString().padStart(2, '0'),
            year: userSelectedYear
        }).toString();
        const url = `${process.env.REACT_APP_SERVER_URL}/expenses/export?${queryParams}`;
        axios.get(url, {
            responseType: 'blob',
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `expenses_${userSelectedMonth}_${userSelectedYear}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    }

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
                style={{ "userSelect": "none" }}
                onClick={() => setEnableOutofBudget(!enableOutofBudget)}
            >
                {/* <label className="inline-flex items-center me-5 cursor-pointer space-x-2"> */}
                <input type="checkbox" value="" className="sr-only peer" checked={enableOutofBudget}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className={`font-semibold ${enableOutofBudget ? 'text-white' : 'text-gray-400'}`}> Limit </span>
                {/* </label> */}
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
            <div className='flex flex-row space-x-2 cursor-pointer p-2 rounded-md'
                style={{ backgroundColor: 'rgb(75 85 99 / 1)' }}>
                <DownloadIcon
                    onClick={downloadExcel} // Updated to call downloadExcel
                    className="cursor-pointer"
                    style={{ color: "white" }}
                />
            </div>
            <div
                className='flex flex-row space-x-2 cursor-pointer p-2 rounded-md'
                style={{ backgroundColor: 'rgb(75 85 99 / 1)' }}>
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