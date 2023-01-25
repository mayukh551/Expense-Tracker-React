import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import SelectBtn from '../../UI/SelectBtn';
import '../Profile.css'

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthExpenseChart = () => {
  const currentMonth: number = new Date().getMonth();
  const [chartMonth, setChartMonth] = useState<string>(monthList[currentMonth]);
  var yearList: string[] = [];
  const year: string = String(new Date().getFullYear());
  const [chartYear, setChartYear] = useState<string>(year);
  const currentYear = parseInt(year);
  for (let year = currentYear - 1; year >= 2019; year--) {
    yearList.push(String(year));
  }

  const monthSelectEventHandler = (event: SelectChangeEvent<string>) => {
    setChartMonth(event.target.value);
  }

  const yearSelectEventHandler = (event: SelectChangeEvent<string>) => {
    setChartYear(event.target.value);
  }

  return (
    <div className="chart-wrapper">
      <div className="chart" style={{ width: '600px', margin: 'auto', marginTop: '50px' }}>
        <SelectBtn
          options={monthList.slice(1)}
          defaultVal={monthList[currentMonth]}
          val={chartMonth}
          selectEventHandler={monthSelectEventHandler}
          style={{ backgroundColor: 'white', width: '100px' }}
        />
        <SelectBtn
          options={yearList}
          defaultVal={currentYear}
          val={chartYear}
          selectEventHandler={yearSelectEventHandler}
          style={{ backgroundColor: 'white', width: '100px', marginLeft: '40px' }}
        />
        {/* {expenseData !== undefined && expenseData.length === 0 && <h4>No expenses found</h4>}
        {expenseData !== undefined && expenseData.length > 0 && <Line options={options} data={data} />} */}
      </div>
      <h4>{chartMonth}, {chartYear}</h4>
    </div>
  )
}

export default MonthExpenseChart;