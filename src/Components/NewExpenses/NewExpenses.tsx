import "./NewExpenses.css";
import { useState } from "react";
import ConditionalForm from "./ConditionalForm";
import "./ExpenseForm.css";
import Button from '@mui/material/Button';
import Modal from "../UI/Modal";
import { itemDS } from "../../Models/Interfaces";

const NewExpenses: React.FC<any> = (props) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const newExpenseHandler = () => setIsModalOpen(true);

    const cancelHandler = () => setIsModalOpen(false);

    const addNewExpense = (item: itemDS) => {
        props.createData(item);
        setIsModalOpen(false);
    };

    return (
        <div className="new-expense">
            {/* eslint-disable-next-line react/style-prop-object */}
            <Modal isOpen={isModalOpen} style="w-[90%] md:w-1/2">
                <ConditionalForm
                    addNewExpense={addNewExpense}
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
