import React, { useContext } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import "./ExpenseFilter.css";
import SelectBtn from "../UI/SelectBtn";
import ListContext from "../Store/context";
import { ExpenseContextObj } from "../../Models/Interfaces";
import SearchExpense from "./SearchExpense";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string) => void;
    updateSelectedMonth: (month: string) => void;
    userSelectedMonth: string;
    updateSortOrder: (order: string) => void;
    sortOrder: string;
    userSelectedYear: string
}> = (props) => {

    const expenseList: ExpenseContextObj = useContext(ListContext);

    const filterYearHandler = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        props.updateSelectedYear(event.target.value);
    };

    const sortEventHandler = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        props.updateSortOrder(event.target.value);
    }

    const filterMonthHandler = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        props.updateSelectedMonth(event.target.value);
    }

    var yearList: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(year)
    }

    var monthList: string[] = expenseList.month;
    const currentMonth: string = monthList[new Date().getMonth()];
    console.log(currentMonth);


    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter</label>
                <div className="expense-filter-options">
                    <SelectBtn
                        // options={monthList.slice(1)}
                        options={monthList}
                        // defaultVal={currentMonth}
                        val={props.userSelectedMonth}
                        selectEventHandler={filterMonthHandler}
                        style={{ backgroundColor: 'white', width: '70px', height: '40px', fontSize: '14px' }}
                    />
                    <SelectBtn
                        options={yearList}
                        // defaultVal={currentYear}
                        val={props.userSelectedYear}
                        selectEventHandler={filterYearHandler}
                        style={{ backgroundColor: 'white', width: '80px', height: '40px', fontSize: '14px' }}
                    />
                </div>
            </div>
            <div className="expenses-filter__control">
                <label>Sort By</label>
                <SelectBtn
                    options={['Recent', 'High - Low', 'Low - High', 'A - Z', 'Z - A']}
                    // defaultVal={'Recent'}
                    val={props.sortOrder}
                    selectEventHandler={sortEventHandler}
                    style={{ backgroundColor: 'white', width: '90px', height: '40px', fontSize: '14px' }}
                />
            </div>
            
        </div >
    );
};

export default ExpensesFilter;
