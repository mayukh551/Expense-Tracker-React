import React from "react";

import "./ExpenseFilter.css";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string | null) => void;
}> = (props) => {
    const selectEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        props.updateSelectedYear(event.target.value);
    };

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <select
                    className="dropdown-years"
                    onChange={selectEventHandler}
                >
                    <option value="All">All</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;
