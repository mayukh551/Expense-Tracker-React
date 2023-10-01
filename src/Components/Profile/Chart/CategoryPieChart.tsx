import React, { useEffect, useState } from 'react'
import '../Profile.css'

import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import SelectBtn from '../../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material/Select';
import ChartSpinner from '../../UI/Spinners/ChartSpinner';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    }
  }
};


function CategoryPieChart() {

  const [expenseData, setExpenseData] = useState<number[]>([40, 24, 12]);
  const year: string = String(new Date().getFullYear());
  const [chartYear, setChartYear] = useState<string>(localStorage.getItem('year')!);
  const [labels, setLabels] = useState<string[]>([]);

  var yearList: string[] = [];

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentYear = parseInt(year);
  for (let year = currentYear; year >= 2019; year--) {
    yearList.push(String(year));
  }
  // console.log(expenseData)

  const data = {
    labels: labels,
    datasets: [{
      label: 'Expenses',
      data: expenseData,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      hoverOffset: 4
    }]
  };

  console.log(data);

  const selectEventHandler = (event: SelectChangeEvent<string>) => {
    setChartYear(event.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    async function fetchYearAnalytics() {
      // console.log(isLoading)

      console.log('fetching category pie chart data');

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/profile/pie-chart/category/${localStorage.getItem('userId')}?year=${chartYear}`, {
        headers: {
          'x-access-token': `${localStorage.getItem('token')}`
        }
      });
      const { data, labels } = await response.json();
      console.log(data, labels);
      setIsLoading(false);
      return { data, labels };
    }


    fetchYearAnalytics()
      .then((data) => {
        if (data.data != null) {
          setExpenseData([...data.data])
          setLabels([...data.labels])
        }
        else {
          setExpenseData([]);
          setLabels([]);
        }
      })
  }, [chartYear]);

  return (
    <div>
      <div className="chart-wrapper">
        <div className="chart" style={{ width: '370px', margin: 'auto', marginTop: '20px' }}>
          <SelectBtn
            options={yearList}
            val={chartYear}
            selectEventHandler={selectEventHandler}
            style={{ backgroundColor: 'white', width: '100px', height: '30px', marginBottom: '10px' }}
          />
          {isLoading && <ChartSpinner />}
          {!isLoading && expenseData!.length === 0 && <h4 className='mt-8 mb-4 font-medium text-lg'>You have no expenses for {chartYear}</h4>}

          {!isLoading && expenseData!.length > 0 && <Doughnut options={options} data={data} />}
        </div>
        <h4 className='mt-4 text-base font-bold px-4 py-2 rounded-md shadow-md w-fit mx-auto'>Category Based Expenses</h4>
      </div>
    </div>
  )
}

export default CategoryPieChart;