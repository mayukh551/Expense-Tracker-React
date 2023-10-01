import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectBtn: React.FC<any> = (props) => {
    const options = props.options;
    const style = props.style;
    var val = props.val;
    const fontSize = props.fontSize;
    const defaultVal = props.defaultVal;

    if (val === "") val = defaultVal;

    console.log("In SelectBtn", defaultVal, val);

    return (
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={val}
            sx={style}
            onChange={props.selectEventHandler}
        >
            {defaultVal && <MenuItem value={`${defaultVal}`}>{defaultVal}</MenuItem>}
            {options.map((option: string) => {
                return (
                    <MenuItem value={`${option}`} sx={{ fontSize: fontSize || '14px' }}>{option}</MenuItem>
                )
            })}
        </Select>
    )
}

export default SelectBtn;