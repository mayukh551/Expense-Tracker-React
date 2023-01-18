import React from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import "./ExpenseFilter.css";
import SelectBtn from "../UI/SelectBtn";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string | null) => void;
    updateSortOrder: (order: string | null) => void;
    sortOrder: string | null;
    userSelectedYear: string | null
}> = (props) => {
    const selectEventHandler = (event: SelectChangeEvent<string | null>) => {
        console.log(event.target.value);
        props.updateSelectedYear(event.target.value);
    };

    const sortEventHandler = (event: SelectChangeEvent<string | null>) => {
        console.log(event.target.value);
        props.updateSortOrder(event.target.value);
    }

    var yearList: number[] = [];

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(year)
    }

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <SelectBtn
                    options={yearList}
                    defaultVal={'All'}
                    val={props.userSelectedYear}
                    selectEventHandler={selectEventHandler}
                    style={{ backgroundColor: 'white' }}
                />
            </div>
            <div className="expenses-filter__control">
                <label>Sort By</label>
                <SelectBtn
                    options={['High - Low', 'Low - High']}
                    defaultVal={'None'}
                    val={props.sortOrder}
                    selectEventHandler={sortEventHandler}
                    style={{ backgroundColor: 'white' }}
                />
            </div>
        </div >
    );
};

export default ExpensesFilter;
