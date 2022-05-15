import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpenses.css";

const NewExpenses = (props) => {
    // Passing Back New Expanse Data
    // to App.js Component for updating list
    const saveNewExpenseData = (expenseData) => {
        console.log("Recieved expense data from ExpenseForm", expenseData);
        props.updateList(expenseData);
    };

    return (
        <div className="new-expense">
            <ExpenseForm
                onSaveExpenseDataHandler={saveNewExpenseData}
                expenses={props.expenses}
            />
        </div>
    );
};

export default NewExpenses;
