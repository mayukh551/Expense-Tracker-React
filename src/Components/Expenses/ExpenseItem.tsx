import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";
import NewInfoInput from "./NewInfoInput";
import { itemDS } from "../../Models/Interfaces";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import updateDataOnDB from "../../API/updateExpense";
import deleteFromDB from "../../API/deleteExpense";
import ConditionalForm from "../NewExpenses/ConditionalForm";
import Modal from "../UI/Modal";


const ExpenseItem: React.FC<{
    item: itemDS;
    reNewList: (item: itemDS) => void;
    updateDataHandler: (item: itemDS) => void;
}> = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState<string>(props.item.title);
    const [prevTitle, setPrevTitle] = useState<string>(props.item.title);
    const [amount, setAmount] = useState<string>(props.item.amount);
    const [prevAmount, setPrevAmount] = useState<string>(props.item.amount);
    const [date, setDate] = useState<string>(props.item.date);
    const [prevDate, setPrevDate] = useState<string>(props.item.date);
    const [updatedCard, setUpdatedCard] = useState<boolean>(false);

    // quantity
    const [quantity, setQuantity] = useState<number>(props.item.quantity!);

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        console.log("In DelHandler", props.item);
        deleteFromDB(props.item);
        props.reNewList(props.item);
    };

    const updateDataHandler = () => {

        setUpdatedCard(false);
        props.updateDataHandler(props.item);
        updateDataOnDB(props.item, {
            date: date,
            title: title,
            amount: amount,
        });
    }

    const cancelHandler = () => {
        setTitle(prevTitle);
        setAmount(prevAmount);
        setDate(prevDate);
        setUpdatedCard(false);
    }


    const month = date.slice(5, 7);
    const day = date.slice(8);
    const year = date.slice(0, 4);

    return (
        <div>
            <Card className="expense-item">

                <ExpenseDate date={date} />

                {/* <ExpenseDate date={props.item.date} /> */}

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
                        onClick={cardDeleteHandler}
                    >Delete</Button>
                    {!updatedCard && (
                        <Button variant="contained" size="small" onClick={cardUpdateHandler}>Update</Button>
                    )}
                </div>

                {/* Open Update Modal */}
                {updatedCard &&
                    <Modal isOpen={updatedCard} style="w-1/2">
                        <ConditionalForm
                            cancelHandler={cancelHandler}
                            updateExpenseToServer={updateDataHandler}
                            item={props.item}
                            op="update" />
                    </Modal>
                }

                {/* {updatedCard && (
                    <div className="action-buttons">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setTitle(prevTitle);
                                setAmount(prevAmount);
                                setDate(prevDate);
                                setUpdatedCard(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setUpdatedCard(false);
                                props.updateDataHandler(props.item);
                                updateDataOnDB(props.item, {
                                    date: date,
                                    title: title,
                                    amount: amount,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </div>
                )} */}
            </div>
        </div >
    );
};

export default ExpenseItem;
