import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./ExpenseFilter.css";

const ExpensesFilter: React.FC<{
    updateSelectedYear: (year: string | null) => void;
}> = (props) => {
    const selectEventHandler = (event: React.ChangeEventHandler<HTMLSelectElement>) => {
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
                {/* <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value='All'
                    sx={{backgroundColor: 'white'}}
                    onChange={selectEventHandler}
                    autoWidth
                    label="Year"
                >
                    <MenuItem value="All">
                        <em>All</em>
                    </MenuItem>
                    {yearList.map((year) => {
                        return (
                            <MenuItem value={`${year}`}> {year}</MenuItem>
                        )
                    })}
                </Select> */}
            </div>
            <div className="expenses-filter__control">
                <label>Sort By</label>
                <select
                    className="dropdown-sort"
                // onChange={selectEventHandler}
                >
                    <option value="High to Low">High to Low</option>
                    <option value="Low to High">Low to High</option>
                </select>
            </div>
        </div >
    );
};

export default ExpensesFilter;
