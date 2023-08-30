import React, { useState, useContext } from "react";
import { itemDS } from "../../Models/Interfaces";
import ListContext from "../Store/context";
import "./ExpenseForm.css";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import SelectBtn from "../UI/SelectBtn";


const ConditionalForm: React.FC<{
    cancelHandler: () => void;
    sendNewExpenseToServer: (item: itemDS) => void
}> = (props) => {
    const expenseList = useContext(ListContext);

    // const categoryList: string[] = expenseList.category;
    const categoryList: string[] = ["Home", "Food", "Travel", "Shopping", "Others"];
    const [enteredTitle, setEnteredTitle] = useState<string>("");
    const [enteredAmount, setEnteredAmount] = useState<string>("");
    const [enteredDate, setEnteredDate] = useState<string>("");
    const [enteredQuantity, setEnteredQuantity] = useState<number>(1);
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

        const newId: string = uuidv4();
        console.log(enteredQuantity);


        const expenseData: itemDS = {
            id: newId,
            title: enteredTitle,
            amount: String(parseInt(enteredAmount) * enteredQuantity),
            date: enteredDate,
            quantity: enteredQuantity
        };
        console.log(expenseData);

        // Reseting user inputs to null
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
        setEnteredQuantity(1);

        expenseList.addItem(expenseData);
        props.sendNewExpenseToServer(expenseData);
    };

    const isQuantityDisabled: boolean = enteredAmount !== "" && enteredAmount !== "0" ? false : true;

    return (
        <>
            <div className="new-expense__controls">
                <TextField id="filled-basic" label="Title" variant="filled"
                    className="input_title"
                    value={enteredTitle}
                    onChange={(e) => setEnteredTitle(e.target.value)} />
                <TextField id="filled-basic" label="Amount" variant="filled"
                    className="input_title"
                    value={parseInt(enteredAmount) * enteredQuantity}
                    type="number"
                    inputProps={{
                        min: 1
                    }}
                    onChange={(e) => {
                        setEnteredAmount(e.target.value);
                        setEnteredQuantity(1);
                    }} />
                <TextField id="filled-basic" label="" variant="filled"
                    className="input_title"
                    value={enteredDate}
                    type="date"
                    inputProps={{
                        min: "2019-01-01",
                        max: `${new Date().getFullYear()}-12-31`
                    }}
                    onChange={(e) => setEnteredDate(e.target.value)} />
                <TextField id="filled-basic" label="Quantity" variant="filled"
                    disabled={isQuantityDisabled}
                    className="input_title"
                    value={enteredQuantity}
                    type="number"
                    inputProps={{
                        min: 1,
                        max: 100000
                    }}
                    onChange={(e) => {
                        const val: number = parseInt(e.target.value);
                        if (val < 1)
                            setEnteredQuantity(1);
                        else if (val > 100000)
                            setEnteredQuantity(100000);
                        else
                            setEnteredQuantity(val);
                    }} />
                {/* Put options for Category */}
                <SelectBtn options={categoryList} val={'Home'} style={{ backgroundColor: 'white' }} />
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
