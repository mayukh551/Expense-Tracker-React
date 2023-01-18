import React, { useEffect, useContext, useState } from 'react'
import '../Profile.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import ListContext from '../../Store/context';
import { itemDS, ExpenseContextObj } from '../../../Models/Interfaces';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        }
    }
};

const YearExpenseChart: React.FC = () => {

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const [expenseData, setExpenseData] = useState<number[]>();
    const year: string = String(new Date().getFullYear());
    const labels = expenseList.month;

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

    useEffect(() => {
        var expenses: number[] = [];
        if (localStorage.getItem("expenses")) {
            console.log('recieved local storage');
            if (expenseList.list.length > 0) {
                // updating the localStorage
                expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                expenseList.list.forEach((item: itemDS) => {
                    if (item.date.slice(0, 4) === year) {
                        // console.log(item.amount);
                        const monthNo: number = parseInt(item.date.slice(5, 7));
                        expenses[monthNo - 1] += parseInt(item.amount);
                    }
                })
                localStorage.setItem('expenses', JSON.stringify(expenses));
            }
            else {
                const getExpenses: string = localStorage.getItem("expenses")!;
                expenses = JSON.parse(getExpenses);
            }
        }

        else {
            console.log(expenseList.list);
            expenseList.list.forEach((item: itemDS) => {
                if (item.date.slice(0, 4) === year) {
                    expenses.push(parseInt(item.amount));
                }
            })
            console.log(expenses);

            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
        setExpenseData([...expenses]);
    }, [expenseList.list, year]);


    return (
        <div className="chart-wrapper">
            <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '20px' }}>
                <Line options={options} data={data} />
            </div>
            <h4>Expenses in 2023</h4>
        </div>
    )
}



export default YearExpenseChart;