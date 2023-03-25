import { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
import Button from '@mui/material/Button';
import sendNewExpenseToServer from "../../API/createExpense";


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
