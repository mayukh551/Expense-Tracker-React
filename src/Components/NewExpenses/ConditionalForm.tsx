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
                <TextField id="filled-basic" label="Title" variant="filled"
                    className="input_title"
                    value={enteredTitle}
                    onChange={(e) => setEnteredTitle(e.target.value)} />
                <TextField id="filled-basic" label="Amount" variant="filled"
                    className="input_title"
                    value={enteredAmount}
                    type="number"
                    inputProps={{
                        min: 1
                    }}
                    onChange={(e) => setEnteredAmount(e.target.value)} />
                <TextField id="filled-basic" label="" variant="filled"
                    className="input_title"
                    value={enteredDate}
                    type="date"
                    inputProps={{
                        min: "2019-01-01",
                        max: `${new Date().getFullYear()}-12-31`
                    }}
                    onChange={(e) => setEnteredDate(e.target.value)} />
            </div>
            <div className="new-expense__actions">
                <Button
                    variant="contained"
                    size='medium'
                    onClick={props.cancelHandler}
                >Cancel</Button>
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
