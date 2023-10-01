import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import '../Profile.css'

import { Chart as ChartJS, CategoryScale,ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import SelectBtn from '../../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material/Select';
import ChartSpinner from '../../UI/Spinners/ChartSpinner';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement);


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        }
    }
};

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function MonthlyCategoryExpenseChart() {

    const [expenseData, setExpenseData] = useState<number[]>([40,24,12]);
    const year: string = String(new Date().getFullYear());
    const [chartYear, setChartYear] = useState<string>(localStorage.getItem('year')!);

    const categoryList = ["Food","Gaming","Travel","Home"]
    const labels: string[] = categoryList;
    var yearList: string[] = [];

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentYear = parseInt(year);
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(String(year));
    }
    // console.log(expenseData)

    const data = {
      labels: categoryList,
      datasets: [{
        label: 'My First Dataset',
        data: expenseData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    console.log(data);

    const selectEventHandler = (event: SelectChangeEvent<string>) => {
        setChartYear(event.target.value);
        setIsLoading(true);
    };

// useEffect(() => {
//   async function fetchYearAnalytics() {
//       console.log(isLoading)
//       const response = await fetch(
//           `${process.env.REACT_APP_SERVER_URL}/profile/year/${chartYear}`, {
//           headers: {
//               'x-access-token': `${localStorage.getItem('token')}`
//           }
//       });
//       const { data } = await response.json();
//       console.log(data);
//       setIsLoading(false);
//       return data;
//   }


//   fetchYearAnalytics()
//       .then((data) => {
//           console.log(isLoading);
//           if (data != null)
//               setExpenseData([...data])
//           else
//               setExpenseData([]);
//       })
// }, [chartYear]);

  return (
    <div>
        <div className="chart-wrapper">
            <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '20px' }}>
                {/* <SelectBtn
                    options={monthList}
                    val={chartYear}
                    selectEventHandler={selectEventHandler}
                    style={{ backgroundColor: 'white', width: '100px' }} */}
                {/* /> */}
                {/* {isLoading && <ChartSpinner />} */}
                {/* {!isLoading && expenseData!.length === 0 && <h4 className='mt-8 mb-4 font-medium text-lg'>You have no expenses for {chartYear}</h4>} */}
                
                {<Doughnut options={options} data={data} />}
            </div>
            <h4 className='mt-4 text-base font-bold px-4 py-2 rounded-md shadow-md w-fit mx-auto'>Monthly Category Wise Expense Chart</h4>
        </div>
    </div>
  )
}

export default MonthlyCategoryExpenseChart;