import React, { useState } from "react";
import "./ExpenseItem.css";

const NewInfoInput = (props) => {

    // variables to pass through props
    // value = {}
    // type = {}
    // setFunction

    return (
        <div className="new-Title">
            {console.log(props.val)}
            <input
                type={`${props.type}`}
                value={props.val}
                onChange={(e) => {
                    props.setNewValue(e.target.value);
                }}
            />
            <span className="action-buttons update-option-btn">
            </span>
        </div>
    );
};

export default NewInfoInput;
