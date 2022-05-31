import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { Fragment, useReducer, useState } from "react";
import NewInfoInput from "./NewInfoInput";


const ExpenseItem = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState(props.item.title);
    const [prevTitle, setPrevTitle] = useState(props.item.title);
    const [amount, setAmount] = useState(props.item.amount);
    const [prevAmount, setPrevAmount] = useState(props.item.amount);
    const [date, setDate] = useState(props.item.date);
    const [prevDate, setPrevDate] = useState(props.item.date);
    const [updatedCard, setUpdatedCard] = useState(false);

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        console.log(props.item);
        props.reNewList(props.item);
    };

    const month = date.getMonth();
    const day = date.toLocaleString("en-US", { day: "2-digit" });
    const year = date.getFullYear();

    return (
        <div>
            <Card className="expense-item">
                {console.log(typeof month)}
                {updatedCard === true ? (
                    <NewInfoInput
                        type={"Date"}
                        val={`${year}-${
                            month < 10 ? "0" + month : month
                        }-${day}`}
                        setNewValue={setDate}
                        setUpdatedCard={setUpdatedCard}
                    />
                ) : (
                    <>
                        {console.log(date)}
                        <ExpenseDate date={date} />
                    </>
                )}
                {/* <ExpenseDate date={props.item.date} /> */}

                <div className="expense-item__description">
                    {/* Update Title */}

                    {updatedCard === true ? (
                        <NewInfoInput
                            type={"text"}
                            val={title}
                            setNewValue={setTitle}
                            setUpdatedCard={setUpdatedCard}
                        />
                    ) : (
                        <h2>{title}</h2>
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
                    <button onClick={cardDeleteHandler}>Delete</button>
                    {!updatedCard && (
                        <button onClick={cardUpdateHandler}>Update</button>
                    )}
                </div>
                {updatedCard && (
                    <div className="action-buttons">
                        <button
                            onClick={() => {
                                setTitle(prevTitle);
                                setAmount(prevAmount);
                                setDate(prevDate);
                                setUpdatedCard(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setUpdatedCard(false);
                            }}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseItem;
