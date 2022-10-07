import React from "react";
import ChartBar from "./ChartBar";
import './Chart.css'

const Chart = ({ dataPoints }) => {
    console.log('In char.jsx', dataPoints)
    return (
        <div className="chartBars">
            {dataPoints.map((dataPoint) => {
                return <ChartBar key={dataPoint.title} value={dataPoint.amount} maxValue={500} label={dataPoint.title}/>;
            })}
        </div>
    );
};

export default Chart;
