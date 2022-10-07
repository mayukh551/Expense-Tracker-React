import { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
// import itemDS from "../../Models/ItemDS";

const sendNewExpenseToServer = async (userData: {
    title: string,
    amount: string,
    date: string
}): Promise<void> => {
    // await fetch("https://mighty-eyrie-95374.herokuapp.com/expenses/new", {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/expenses/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
        .then(() => console.log("New Expense Sent to backend server"))
        .catch((err) => console.log("Error:", err));
};

const ExpenseForm = () => {
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
                cancelHandler={cancelHandler}
                sendNewExpenseToServer={sendNewExpenseToServer}
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
            <form>{currentFormDisplay}</form>
        </div>
    );
};

export default ExpenseForm;
