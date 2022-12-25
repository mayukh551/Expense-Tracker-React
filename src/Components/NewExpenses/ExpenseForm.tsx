import { useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";

const sendNewExpenseToServer = async (userData: itemDS): Promise<void> => {
    console.log(userData);

    await fetch(`${process.env.REACT_APP_SERVER_URL}/expenses/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': `${localStorage.getItem('token')}`
        },
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
