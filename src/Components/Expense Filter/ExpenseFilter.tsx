import React from "react";

import "./ExpenseFilter.css";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string | null) => void;
}> = (props) => {
    const selectEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        props.updateSelectedYear(event.target.value);
    };

    var yearList: number[] = [];

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(year)
    }

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <select
                    className="dropdown-years"
                    onChange={selectEventHandler}
                >
                    <option value="All">All</option>
                    {yearList.map((year) => {
                        return (
                            <option value={`${year}`}> {year}</option>
                        )
                    })}
                </select>
            </div>
        </div >
    );
};

export default ExpensesFilter;
