import "./NewExpenses.css";
import { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
import Button from '@mui/material/Button';
import sendNewExpenseToServer from "../../API/createExpense";
import Modal from "../UI/Modal";

const NewExpenses = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const newExpenseHandler = () => {
        setIsModalOpen(true);
    };

    const cancelHandler = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="new-expense">
            <Modal isOpen={isModalOpen} style="w-1/2">
                <ConditionalForm
                    sendNewExpenseToServer={sendNewExpenseToServer}
                    cancelHandler={cancelHandler}
                    op="add"
                    openModalHandler={setIsModalOpen}
                />
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

export default NewExpenses;
