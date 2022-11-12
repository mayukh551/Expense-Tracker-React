import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";
import NewInfoInput from "./NewInfoInput";
import itemDS from "../../Models/ItemDS";

async function deleteFromDB(item: itemDS) {
    console.log("in deleteFromDB", item);
    await fetch(
        `${process.env.REACT_APP_SERVER_URL}/expenses/delete/${item._id}/`,
        {
            method: "DELETE",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }
    );
}

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

    async function updateDataOnDB() {
        console.log("updateDataOnDB");
        const newItem = {
            date: date,
            title: title,
            amount: amount,
        };
        console.log(newItem);
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}/expenses/update/${props.item._id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    'x-access-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newItem),
            }
        );
    }

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
                                props.updateDataHandler(props.item);
                                updateDataOnDB();
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
