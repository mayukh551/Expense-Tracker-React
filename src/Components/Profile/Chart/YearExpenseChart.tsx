import React, { useEffect, useState } from 'react'
import '../Profile.css'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import SelectBtn from '../../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material/Select';
import ChartSpinner from '../../UI/Spinners/ChartSpinner';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        }
    }
};

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const YearExpenseChart: React.FC = () => {

    // const expenseList: ExpenseContextObj = useContext(ListContext);
    const [expenseData, setExpenseData] = useState<number[]>([]);
    const year: string = String(new Date().getFullYear());
    const [chartYear, setChartYear] = useState<string>(localStorage.getItem('year')!);
    const labels: string[] = monthList;
    var yearList: string[] = [];

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentYear = parseInt(year);
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(String(year));
    }
    console.log(expenseData)

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

    console.log(data);

    const selectEventHandler = (event: SelectChangeEvent<string>) => {
        setChartYear(event.target.value);
        setIsLoading(true);
    };

    useEffect(() => {
        async function fetchYearAnalytics() {
            console.log(isLoading)
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/profile/year/${chartYear}`, {
                headers: {
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });
            const { data } = await response.json();
            console.log(data);
            setIsLoading(false);
            return data;
        }


        fetchYearAnalytics()
            .then((data) => {
                console.log(isLoading);
                if (data != null)
                    setExpenseData([...data])
                else
                    setExpenseData([]);
            })
    }, [chartYear]);


    return (
        <div className="chart-wrapper">
            <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '20px' }}>
                <SelectBtn
                    options={yearList}
                    val={chartYear}
                    selectEventHandler={selectEventHandler}
                    style={{ backgroundColor: 'white', width: '100px' }}
                />
                {isLoading && <ChartSpinner />}
                {!isLoading && expenseData!.length === 0 && <h4 className='mt-8 mb-4 font-medium text-lg'>You have no expenses for {chartYear}</h4>}
                {!isLoading && expenseData!.length > 0 && <Line options={options} data={data} />}
            </div>
            <h4 className='mt-4 text-base font-bold px-4 py-2 rounded-md shadow-md w-fit mx-auto'>{chartYear}</h4>
        </div>
    )
}



export default YearExpenseChart;