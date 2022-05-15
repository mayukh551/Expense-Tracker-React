import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";


function findItem(item){
    
}

const ExpenseItem = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState(props.item.title);
    
    const cardUpdateHandler = () => {
        findItem(props.item);
    }

    const cardDeleteHandler = () => {
        console.log(props.item);
        props.reNewList(props.item);
    }

    return (
        <div>
            <Card className="expense-item">
                <ExpenseDate date={props.item.date} />

                <div className="expense-item__description">
                    <h2>{title}</h2>
                    <div className="expense-item__price">
                        {props.item.amount}
                    </div>
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
