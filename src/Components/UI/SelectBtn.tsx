import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectBtn: React.FC<any> = (props) => {
    const options = props.options;
    const style = props.style;
    const val = props.val;

    return (
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={val}
            sx={style}
            onChange={props.selectEventHandler}
        >
            {/* <MenuItem value={`${defaultVal}`}>{defaultVal}</MenuItem> */}
            {options.map((option: string) => {
                return (
                    <MenuItem value={`${option}`} sx={{fontSize: '14px'}}>{option}</MenuItem>
                )
            })}
        </Select>
    )
}

export default SelectBtn;