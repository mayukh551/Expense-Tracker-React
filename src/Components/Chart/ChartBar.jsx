import React from "react";
import "./ChartBar.css";

const ChartBar = (props) => {
    let barFilledHeight = "0px";

    // if there is a max value
    let val = parseInt(props.value.slice(0));
    console.log("maxValue and Value:", props.maxValue, val);
    if (props.maxValue > 0)
        barFilledHeight = (val / props.maxValue) * 100 + "px";
    console.log((val / props.maxValue) * 100);

    console.log("barfilledHeight :", barFilledHeight);
    return (
        <div>
            <div className="chart_outer">
                <div
                    className="chart_inner"
                    style={{ height: barFilledHeight }}
                ></div>
            </div>
            <h4>{props.label}</h4>
        </div>
    );
};

export default ChartBar;
