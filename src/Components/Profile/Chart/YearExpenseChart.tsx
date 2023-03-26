import React, { useEffect, useState } from 'react'
import '../Profile.css'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import SelectBtn from '../../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material/Select';
import { useCookies } from 'react-cookie';

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookies] = useCookies(['month', 'year']);

    // const expenseList: ExpenseContextObj = useContext(ListContext);
    const [expenseData, setExpenseData] = useState<number[]>([]);
    const year: string = String(new Date().getFullYear());
    const [chartYear, setChartYear] = useState<string>(cookies.year);
    const labels: string[] = monthList;
    var yearList: string[] = [];

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
    };

    useEffect(() => {
        async function fetchYearAnalytics() {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/profile/year/${chartYear}`, {
                headers: {
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });
            const { data } = await response.json();
            console.log(data);
            return data;
        }

        fetchYearAnalytics()
            .then((data) => {
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
                {expenseData!.length === 0 && <h4>No expenses found</h4>}
                {expenseData!.length > 0 && <Line options={options} data={data} />}
            </div>
            <h4>{chartYear}</h4>
        </div>
    )
}



export default YearExpenseChart;