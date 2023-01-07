import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./ExpenseFilter.css";

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
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={props.userSelectedYear}
                    sx={{ backgroundColor: 'white' }}
                    onChange={selectEventHandler}
                    autoWidth
                >
                    <MenuItem value="All">
                        <em>All</em>
                    </MenuItem>
                    {yearList.map((year) => {
                        return (
                            <MenuItem value={`${year}`}> {year}</MenuItem>
                        )
                    })}
                </Select>
            </div>
            <div className="expenses-filter__control">
                <label>Sort By</label>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={props.sortOrder}
                    sx={{ backgroundColor: 'white' }}
                    onChange={sortEventHandler}
                    autoWidth
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="High - Low">High - Low</MenuItem>
                    <MenuItem value="Low - High">Low - High</MenuItem>
                </Select>
            </div>
        </div >
    );
};

export default ExpensesFilter;
