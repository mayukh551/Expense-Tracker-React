import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import SelectBtn from '../../UI/SelectBtn';
import '../Profile.css'
import ChartSpinner from '../../UI/ChartSpinner';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    }
  }
};


const MonthExpenseChart = () => {

  // const currentMonth: number = new Date().getMonth();
  var yearList: string[] = [];
  const year: string = String(new Date().getFullYear());
  const currentYear = parseInt(year);
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [chartMonth, setChartMonth] = useState<string>(localStorage.getItem('month')!);
  const [chartYear, setChartYear] = useState<string>(localStorage.getItem('year')!);
  const [labels, setLabel] = useState<number[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true);


  for (let year = currentYear; year >= 2019; year--) {
    yearList.push(String(year));
  }

  const monthSelectEventHandler = (event: SelectChangeEvent<string>) => {
    setChartMonth(event.target.value);
    setIsLoading(true);
  }

  const yearSelectEventHandler = (event: SelectChangeEvent<string>) => {
    setChartYear(event.target.value);
    setIsLoading(true);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: expenseData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  useEffect(() => {
    async function fetchMonthAnalytics() {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/profile/month/${chartMonth}/${chartYear}`, {
        headers: {
          'x-access-token': `${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      console.log(result.data);
      setIsLoading(false);
      return result;
    }

    fetchMonthAnalytics()
      .then(({ data, labels }) => {
        if (data != null) {
          setExpenseData([...data])
          setLabel([...labels]);
        }
        else {
          setExpenseData([]);
          setLabel([]);
        }
      })
  }, [chartMonth, chartYear]);


  return (
    <div className="chart-wrapper">
      <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '50px' }}>
        <SelectBtn
          options={monthList}
          val={chartMonth}
          selectEventHandler={monthSelectEventHandler}
          style={{ backgroundColor: 'white', width: '100px' }}
        />
        <SelectBtn
          options={yearList}
          val={chartYear}
          selectEventHandler={yearSelectEventHandler}
          style={{ backgroundColor: 'white', width: '100px', marginLeft: '40px' }}
        />
        {isLoading && <ChartSpinner />}
        {!isLoading && expenseData!.length === 0 && <h4>No expenses found</h4>}
        {!isLoading && expenseData!.length > 0 && <Line options={options} data={data} />}

      </div>
      <h4 className='mt-4 text-base font-bold px-4 py-2 rounded-md shadow-md w-fit mx-auto'>{chartMonth}, {chartYear}</h4>
    </div>
  )
}

export default MonthExpenseChart;