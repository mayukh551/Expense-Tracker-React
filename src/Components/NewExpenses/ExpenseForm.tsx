import { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
import Button from '@mui/material/Button';
import sendNewExpenseToServer from "../../API/createExpense";
import Modal from "../UI/Modal";


const ExpenseForm = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const newExpenseHandler = () => {
        setIsModalOpen(true);
    };

    const cancelHandler = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal isOpen={isModalOpen} style="w-1/2">
                <ConditionalForm sendNewExpenseToServer={sendNewExpenseToServer} cancelHandler={cancelHandler} op="add" />
            </Modal>
            <Button
                variant="contained"
                size='medium'
                onClick={newExpenseHandler}
            > Add New Expense
            </Button >
        </div>
    );
};

export default ExpenseForm;
