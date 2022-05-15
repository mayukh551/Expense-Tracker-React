import React, { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    var [enteredTitle, setEnteredTitle] = useState("");
    var [enteredAmount, setEnteredAmount] = useState("");
    var [enteredDate, setEnteredDate] = useState("");

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
        console.log(e);
        e.preventDefault();
        const expenseData = {
            id: "e" + String(props.expenses.length + 1),
            title: enteredTitle,
            amount: "$" + enteredAmount,
            date: new Date(enteredDate),
        };
        console.log(expenseData);

        // Reseting user inputs to null
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");

        // Passing Back new Expanse Data to NewExpense Component
        props.onSaveExpenseDataHandler(expenseData);
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
