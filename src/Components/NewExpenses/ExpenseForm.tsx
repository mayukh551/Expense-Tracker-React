import { useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
import Button from '@mui/material/Button';

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
            <Button
                variant="contained"
                size='medium'
                onClick={newExpenseHandler}
            > Add New Expense
            </Button >
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
        <Button
            variant="contained"
            size='medium'
            onClick={newExpenseHandler}
        > Add New Expense
        </Button >
    );

    return (
        <div>
            <form>{currentFormDisplay}</form>
        </div>
    );
};

export default ExpenseForm;
