import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import updateDataOnDB from "../../API/updateExpense";
import deleteFromDB from "../../API/deleteExpense";
import ConditionalForm from "../NewExpenses/ConditionalForm";
import Modal from "../UI/Modal";
import WarningModal from "../UI/WarningModal";


const ExpenseItem: React.FC<{
    item: itemDS;
    reNewList: (item: itemDS) => void;
    updateDataHandler: (item: itemDS, newData: any) => void;
    deleteDataHandler: (item: itemDS) => void;
}> = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState<string>(props.item.title);
    const [prevTitle, setPrevTitle] = useState<string>(props.item.title);
    const [amount, setAmount] = useState<string>(props.item.amount);
    const [prevAmount, setPrevAmount] = useState<string>(props.item.amount);
    const [date, setDate] = useState<string>(props.item.date);
    const [prevDate, setPrevDate] = useState<string>(props.item.date);
    const [updatedCard, setUpdatedCard] = useState<boolean>(false);

    const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

    // quantity
    const [quantity, setQuantity] = useState<number>(props.item.quantity!);

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        console.log("In DelHandler", props.item);
        // deleteFromDB(props.item);
        props.deleteDataHandler(props.item);
        props.reNewList(props.item);
    };

    const updateDataHandler = (item: itemDS, newData: any) => {

        setUpdatedCard(false);
        // updateDataOnDB(props.item, newData);
        props.updateDataHandler(props.item, newData);
    }

    const cancelHandler = () => {
        setTitle(prevTitle);
        setAmount(prevAmount);
        setDate(prevDate);
        setUpdatedCard(false);

        setIsConfirmDelete(false);
    }

    return (
        <div>
            <WarningModal
                isOpen={isConfirmDelete}
                onCancel={cancelHandler}
                message={"Are you sure you want to delete this expense?"}
                actionMessage={"Delete"}
                onAction={cardDeleteHandler}
                heading={"Delete Expense"}
            />
            <Card className="expense-item">

                <ExpenseDate date={date} />

                <div className="expense-item__description">
                    {/* Update Title */}

                    <h2>{title}</h2>


                    <div className="py-1 px-2 rounded-md bg-gray-700 text-white">x{quantity}</div>

                    {/* Update Amount */}

                    <div className="expense-item__price">₹ {amount}</div>

                </div>
            </Card>
            <div className="button-arrange">
                <div className="action-buttons">
                    <Button variant="contained"
                        endIcon={<DeleteForeverIcon />}
                        size="small"
                        onClick={() => setIsConfirmDelete(true)}
                    >Delete</Button>
                    {!updatedCard && (
                        <Button variant="contained" size="small" onClick={cardUpdateHandler}>Update</Button>
                    )}
                </div>

                {/* Open Update Modal */}

                <Modal isOpen={updatedCard} style="w-1/2">
                    <ConditionalForm
                        cancelHandler={cancelHandler}
                        updateExpenseToServer={updateDataHandler}
                        item={props.item}
                        openModalHandler={setUpdatedCard}
                        op="update"
                        setTitle={setTitle}
                        setAmount={setAmount}
                        setDate={setDate}
                        setQuantity={setQuantity}
                    />
                </Modal>
            </div>
        </div >
    );
};

export default ExpenseItem;
