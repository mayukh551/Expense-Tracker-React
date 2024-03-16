import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectBtn: React.FC<any> = (props) => {
    const options = props.options;
    const style = props.style;
    var val = props.val;
    const defaultVal = props.defaultVal;
    var font = "";
    var fontSize = "";

    if (style !== undefined) {
        font = style.font;
        fontSize = props.fontSize || style.fontSize;
    }


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
            {defaultVal && <MenuItem value={`${defaultVal}`} style={{ font: font, fontSize: fontSize }}>{defaultVal}</MenuItem>}
            {options.map((option: string) => {
                return (
                    <MenuItem value={`${option}`} sx={{ font: font, fontSize: fontSize || '14px' }}>{option}</MenuItem>
                )
            })}
        </Select>
    )
}

export default SelectBtn;