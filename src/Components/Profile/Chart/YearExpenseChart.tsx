import React, { useEffect, useContext, useState } from 'react'
import '../Profile.css'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import ListContext from '../../Store/context';
import { itemDS, ExpenseContextObj } from '../../../Models/Interfaces';
import SelectBtn from '../../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material/Select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        }
    }
};


const getExpenses = (expenseList: ExpenseContextObj, year: string): number[] => {
    var expenses: number[] = [];
    expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sum: number = 0;

    // inserting expense amount into array
    expenseList.list.forEach((item: itemDS) => {
        if (item.date.slice(0, 4) === year) {
            const monthNo: number = parseInt(item.date.slice(5, 7));
            expenses[monthNo - 1] += parseInt(item.amount);
            sum += parseInt(item.amount);
        }
    })
    console.log(expenses);
    // to check if a specific year has any expenses or not
    if (sum > 0)
        localStorage.setItem('expenses', JSON.stringify(expenses));
    else {
        expenses = [];
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    return expenses;
}



const YearExpenseChart: React.FC = () => {

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const [expenseData, setExpenseData] = useState<number[]>();
    const year: string = String(new Date().getFullYear());
    const [chartYear, setChartYear] = useState<string>(year);
    const labels = expenseList.month;
    var yearList: string[] = [];

    const currentYear = parseInt(year);
    for (let year = currentYear - 1; year >= 2019; year--) {
        yearList.push(String(year));
    }

    const data = {
        labels,
        datasets: [
            {
                label: "Expenses",
                data: expenseData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
        ]
    };

    const selectEventHandler = (event: SelectChangeEvent<string>) => {
        setChartYear(event.target.value);
    };

    useEffect(() => {
        var expenses;
        if (localStorage.getItem("expenses")) {
            console.log('recieved local storage');
            // updating the localStorage
            if (expenseList.list.length > 0) expenses = getExpenses(expenseList, chartYear);

            // const getExpenses: string = localStorage.getItem("expenses")!;
            else expenses = JSON.parse(localStorage.getItem("expenses")!);
        }

        else expenses = getExpenses(expenseList, chartYear);

        setExpenseData([...expenses]);
    }, [chartYear, expenseList, expenseList.list, year]);


    return (
        <div className="chart-wrapper">
            <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '20px' }}>
                <SelectBtn
                    options={yearList}
                    defaultVal={currentYear}
                    val={chartYear}
                    selectEventHandler={selectEventHandler}
                    style={{ backgroundColor: 'white', width: '100px' }}
                />
                {expenseData !== undefined && expenseData.length === 0 && <h4>No expenses found</h4>}
                {expenseData !== undefined && expenseData.length > 0 && <Line options={options} data={data} />}
            </div>
            <h4>{chartYear}</h4>
        </div>
    )
}



export default YearExpenseChart;