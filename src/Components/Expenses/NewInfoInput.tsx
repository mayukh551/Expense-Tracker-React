import React, { Dispatch, SetStateAction } from "react";
import "./ExpenseItem.css";

const NewInfoInput: React.FC<{
    type: string
    val: string
    setNewValue: Dispatch<SetStateAction<string>>
    setUpdatedCard: Dispatch<SetStateAction<boolean>>
}> = (props) => {

    // variables to pass through props
    // value = {}
    // type = {}
    // setFunction

    return (
        <div className="new-Title">
            <input
                type={`${props.type}`}
                value={props.val}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setNewValue(e.target.value);
                }}
            />
            <span className="action-buttons update-option-btn">
            </span>
        </div>
    );
};

export default NewInfoInput;
