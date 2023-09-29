import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConditionalForm from "../NewExpenses/ConditionalForm";
import Modal from "../UI/Modal";
import WarningModal from "../UI/WarningModal";


const ExpenseItem: React.FC<{
    item: itemDS;
    updateDataHandler: (item: itemDS, newData: any) => Promise<unknown>;
    deleteDataHandler: (item: itemDS) => void;
}> = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState<string>(props.item.title);
    const prevTitle = props.item.title;
    const [amount, setAmount] = useState<string>(props.item.amount);
    const prevAmount = props.item.amount;
    const [date, setDate] = useState<string>(props.item.date);
    const prevDate = props.item.date;
    const [updatedCard, setUpdatedCard] = useState<boolean>(false);

    const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

    // quantity
    const [quantity, setQuantity] = useState<number>(props.item.quantity!);
    const prevQuantity = props.item.quantity!;

    const [category, setCategory] = useState<string>(props.item.category!);

    const prevCategory = props.item.category!;

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        setIsConfirmDelete(false);
        console.log("In DelHandler", props.item);
        props.deleteDataHandler(props.item);
    };

    const updateDataHandler = async (item: itemDS, newData: any) => {

        setUpdatedCard(false);
        console.log('before deleteDataHandler');
        await props.updateDataHandler(props.item, newData);
        console.log('after updateDataHandler');
        setTitle(newData.title);
        setAmount(newData.amount);
        setDate(newData.date);
        setQuantity(newData.quantity);
        setCategory(newData.category);
    }

    const cancelHandler = () => {
        setTitle(prevTitle);
        setAmount(prevAmount);
        setDate(prevDate);
        setQuantity(prevQuantity);
        setCategory(prevCategory);
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
                    <div className="flex flex-row space-x-1">
                        <h2>{title}</h2>
                        <div className="bg-green-600 rounded-md px-2 py-1 text-white">{category}</div>
                    </div>

                    <div className="flex flex-row space-x-2 items-center">
                        {/* Update Quantity */}
                        <div className="py-1 px-2 rounded-md bg-gray-700 text-white">x{quantity}</div>

                        {/* Update Amount */}

                        <div className="expense-item__price">₹ {parseInt(amount) * quantity}</div>
                    </div>

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

                {/* eslint-disable-next-line react/style-prop-object */}
                <Modal isOpen={updatedCard} style="w-1/2">
                    <ConditionalForm
                        cancelHandler={cancelHandler}
                        updateExpenseToServer={updateDataHandler}
                        item={{
                            id: props.item.id,
                            title: title,
                            amount: amount,
                            date: date,
                            quantity: quantity,
                            category: category
                        }}
                        openModalHandler={setUpdatedCard}
                        op="update"
                    />
                </Modal>
            </div>
        </div >
    );
};

export default ExpenseItem;
