import React, { useState, useContext } from "react";
import { itemDS } from "../../Models/Interfaces";
import ListContext from "../Store/context";
import "./ExpenseForm.css";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


const ConditionalForm: React.FC<{
    cancelHandler: () => void;
    sendNewExpenseToServer: (item: itemDS) => void
}> = (props) => {
    const expenseList = useContext(ListContext);

    const [enteredTitle, setEnteredTitle] = useState<string>("");
    const [enteredAmount, setEnteredAmount] = useState<string>("");
    const [enteredDate, setEnteredDate] = useState<string>("");
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    // const errorInputProp = isEmpty ? true : null;

    const submitHandler = (e: React.FormEvent) => {
        console.log("in Submit Handler of new data");
        e.preventDefault();
        // console.log("New Entered Date : ", enteredDate);
        const isInputEmpty: boolean =
            enteredTitle === "" || enteredAmount === "" || enteredDate === "";

        if (isInputEmpty) {
            setIsEmpty(true);
            return;
        }

        setIsEmpty(false);

        const newId = uuidv4();

        const expenseData: itemDS = {
            id: newId,
            title: enteredTitle,
            amount: enteredAmount,
            date: enteredDate,
        };
        console.log(expenseData);

        // Reseting user inputs to null
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");

        expenseList.addItem(expenseData);
        props.sendNewExpenseToServer(expenseData);
    };
    return (
        <>
            <div className="new-expense__controls">
                <TextField id="outlined-basic" label="Title" variant="outlined"
                    className="input_title"
                    value={enteredTitle}
                    // error={isEmpty}
                    onChange={(e) => setEnteredTitle(e.target.value)} />
                {/* <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={(e) => setEnteredTitle(e.target.value)}
                        id="title-input"
                    />
                </div> */}
                <TextField id="outlined-basic" label="Amount" variant="outlined"
                    className="input_title"
                    value={enteredAmount}
                    type="number"
                    inputProps={{
                        min: 1
                    }}
                    onChange={(e) => setEnteredAmount(e.target.value)} />
                <TextField id="outlined-basic" label="" variant="outlined"
                    className="input_title"
                    value={enteredDate}
                    type="date"
                    inputProps={{
                        min: "2019-01-01",
                        max: "2022-12-31"
                    }}
                    onChange={(e) => setEnteredDate(e.target.value)} />
            </div>
            <div className="new-expense__actions">
                {/* <button onClick={props.cancelHandler}>Cancel</button> */}
                <Button
                    variant="contained"
                    size='medium'
                    onClick={props.cancelHandler}
                >Cancel</Button>
                {/* <button type="submit" onClick={submitHandler}>
                    Add Expense
                </button> */}
                <Button
                    variant="contained"
                    size='medium'
                    onClick={submitHandler}
                >Add Expense</Button>
            </div>
            <div className="new-expense__empty-msg">
                {isEmpty && <p>Please fill in all the details</p>}
            </div>
        </>
    );
};

export default ConditionalForm;
