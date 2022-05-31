import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { Fragment, useState } from "react";
import NewInfoInput from "./NewInfoInput";

const ExpenseItem = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState(props.item.title);
    const [amount, setAmount] = useState(props.item.amount);
    const [updatedCard, setUpdatedCard] = useState(false);

    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const cardDeleteHandler = () => {
        console.log(props.item);
        props.reNewList(props.item);
    };

    return (
        <div>
            <Card className="expense-item">
                <ExpenseDate date={props.item.date} />

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
            <div className="action-buttons">
                <button onClick={cardDeleteHandler}>Delete</button>
                <button onClick={cardUpdateHandler}>Update</button>
            </div>
        </div>
    );
};

export default ExpenseItem;
