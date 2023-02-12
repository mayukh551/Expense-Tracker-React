import React from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import "./ExpenseFilter.css";
import SelectBtn from "../UI/SelectBtn";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string) => void;
    updateSortOrder: (order: string) => void;
    sortOrder: string | null;
    userSelectedYear: string | null
}> = (props) => {
    const selectEventHandler = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        props.updateSelectedYear(event.target.value);
    };

    const sortEventHandler = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        props.updateSortOrder(event.target.value);
    }

    var yearList: number[] = [];

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 1; year >= 2019; year--) {
        yearList.push(year)
    }

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <SelectBtn
                    options={yearList}
                    defaultVal={currentYear}
                    val={props.userSelectedYear}
                    selectEventHandler={selectEventHandler}
                    style={{ backgroundColor: 'white' }}
                />
            </div>
            <div className="expenses-filter__control">
                <label>Sort By</label>
                <SelectBtn
                    options={['High - Low', 'Low - High', 'A - Z', 'Z - A']}
                    defaultVal={'Recent'}
                    val={props.sortOrder}
                    selectEventHandler={sortEventHandler}
                    style={{ backgroundColor: 'white' }}
                />
            </div>
        </div >
    );
};

export default ExpensesFilter;
