import React, { useState } from "react";
import "./ExpenseItem.css";

const NewInfoInput = (props) => {

    // variables to pass through props
    // value = {}
    // type = {}
    // setFunction
    const [prevVal, setPrevVal] = useState(props.val);

    return (
        <div className="new-Title">
            <input
                type={`${props.type}`}
                value={props.val}
                onChange={(e) => {
                    props.setNewValue(e.target.value);
                }}
            />
            <span className="action-buttons update-option-btn">
                <button
                    onClick={() => {
                        props.setNewValue(prevVal);
                        props.setUpdatedCard(false);
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        props.setUpdatedCard(false);
                    }}
                >
                    Submit
                </button>
            </span>
        </div>
    );
};

export default NewInfoInput;
