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
    const [prevCategory, setPrevCategory] = useState<string>(props.item.category ? props.item.category : "Others");
    const [category, setCategory] = useState<string>(props.item.category ? props.item.category : "Others");

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        console.log("In DelHandler", props.item);
        deleteFromDB(props.item);
        props.reNewList(props.item);
    };

    const month = date.slice(5, 7);
    const day = date.slice(8);
    const year = date.slice(0, 4);

    return (
        <div>
            <Card className="expense-item">
                {updatedCard === true ? (
                    <NewInfoInput
                        type={"Date"}
                        val={`${year}-${month}-${day}`}
                        setNewValue={setDate}
                        setUpdatedCard={setUpdatedCard}
                    />
                ) : (
                    <>
                        {/* {console.log(date)} */}
                        <ExpenseDate date={date} />
                    </>
                )}
                {/* <ExpenseDate date={props.item.date} /> */}

                <div className="expense-item__description">
                    {/* Update Title */}

                    {updatedCard === true ? (
                        <>
                            <NewInfoInput
                                type={"text"}
                                val={title}
                                setNewValue={setTitle}
                                setUpdatedCard={setUpdatedCard}
                            />

                            <NewInfoInput
                                type={"text"}
                                val={category}
                                setNewValue={setCategory}
                                setUpdatedCard={setUpdatedCard}
                            />
                        </>
                    ) : (
                        <h2><span className="">{title}</span>
                            <span className="ml-4 bg-green-600 text-black font-bold px-2 py-2 rounded-md text-sm">
                                {category}
                            </span></h2>
                    )}

                    {/* Update Amount */}

                    {updatedCard === true ? (
                        <NewInfoInput
                            type={"text"}
                            val={amount}
                            setNewValue={setAmount}
                            setUpdatedCard={setUpdatedCard}
                        />
                    ) : (
                        <div className="expense-item__price">${amount}</div>
                    )}
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
                {updatedCard && (
                    <div className="action-buttons">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setTitle(prevTitle);
                                setAmount(prevAmount);
                                setDate(prevDate);
                                setCategory(prevCategory);
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
                )}
            </div>
        </div>
    );
};

export default ExpenseItem;
