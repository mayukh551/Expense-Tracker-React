import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import SelectBtn from '../../UI/SelectBtn';
import '../Profile.css'
import ChartSpinner from '../../UI/Spinners/ChartSpinner';

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
      <div className="chart bg-white w-[300px] md:w-[600px] m-auto mt-[20px]">
        <div className='flex flex-col justify-start items-start md:flex-row space-y-3 md:space-y-0 space-x-0 md:space-x-8'>
          <SelectBtn
            options={monthList}
            val={chartMonth}
            selectEventHandler={monthSelectEventHandler}
            style={{ backgroundColor: 'white', width: '100px', height: '30px', marginBottom: '10px' }}
          />
          <SelectBtn
            options={yearList}
            val={chartYear}
            selectEventHandler={yearSelectEventHandler}
            style={{ backgroundColor: 'white', width: '100px', height: '30px', marginBottom: '10px' }}
          />
        </div>
        {isLoading && <ChartSpinner />}
        {!isLoading && expenseData!.length === 0 && <h4 className='mt-8 mb-4 font-medium text-lg'>You have no expenses for {chartMonth}</h4>}
        {!isLoading && expenseData!.length > 0 && <Line options={options} data={data} />}

      </div>
      <h4 className='bg-white mt-4 text-base font-bold px-4 py-2 rounded-md shadow-md w-fit mx-auto'>Daily Expense in {chartMonth}, {chartYear}</h4>
    </div>
  )
}

export default MonthExpenseChart;