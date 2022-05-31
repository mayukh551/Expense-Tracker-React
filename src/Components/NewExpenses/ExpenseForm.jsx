import React, { useContext, useState } from "react";
import ListContext from "../Store/context";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const expenseList = useContext(ListContext);

    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value);
    };
    const amountChangeHandler = (e) => {
        setEnteredAmount(e.target.value);
    };

    const dateChangeHandler = (e) => {
        setEnteredDate(e.target.value);
    };

    const submitHandler = (e) => {
        console.log('in Submit Handler of new data');
        console.log('Id of new data', "e" + String(expenseList.list.length + 1));
        e.preventDefault();
        const expenseData = {
            id: "e" + String(expenseList.list.length + 1),
            title: enteredTitle,
            amount: enteredAmount,
            date: enteredDate,
        };
        console.log(expenseData);

        // Reseting user inputs to null
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");

        // Passing Back new Expanse Data to NewExpense Component
        expenseList.addItem(expenseData);
        // props.onSaveExpenseDataHandler(expenseData);
    };

    const cancelHandler = () => {
        setNewDisplay(
            <div className="new-expense__new-action">
                <button type="submit" onClick={newExpenseHandler}>
                    Add New Expense
                </button>
            </div>
        );
    };

    const newExpenseHandler = () => {
        setNewDisplay(
            <ConditionalForm
                enteredTitle={enteredTitle}
                enteredAmount={enteredAmount}
                enteredDate={enteredDate}
                titleChangeHandler={titleChangeHandler}
                amountChangeHandler={amountChangeHandler}
                dateChangeHandler={dateChangeHandler}
                cancelHandler={cancelHandler}
            />
        );
    };

    const [currentFormDisplay, setNewDisplay] = useState(
        <div className="new-expense__new-action">
            <button type="submit" onClick={newExpenseHandler}>
                Add New Expense
            </button>
        </div>
    );

    return (
        <div>
            <form onSubmit={submitHandler}>{currentFormDisplay}</form>
        </div>
    );
};

export default ExpenseForm;
