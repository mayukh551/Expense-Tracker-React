import React, { useState } from 'react'
import SelectBtn from '../UI/SelectBtn';
import { SelectChangeEvent } from '@mui/material';

const LastNdays: React.FC<any> = (props) => {

    const [option, setOption] = useState("Last 30 days");

    const selectEventHandler = (event: SelectChangeEvent<string>) => {
        setOption(event.target.value);

        if (event.target.value === "Last 7 days")
            props.setRange(7);

        if (event.target.value === "Last day")
            props.setRange(1);

        if (event.target.value === "Last 30 days")
            props.setRange(30);
    }

    return (
        <SelectBtn
            options={['Last 7 days', 'Last day']}
            defaultVal={"Last 30 days"}
            val={option}
            selectEventHandler={selectEventHandler}
            style={{ height: '40px', backgroundColor: 'rgb(75 85 99 / 1)', font: 'inherit', color: "white", fontSize: '14px' }}
        />
    )
}


export default LastNdays