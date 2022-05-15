import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";

const ExpenseItem = (props) => {
    // console.log(props.item);
    const [title, setTitle] = useState(props.item.title);

    const clickHandler = () => {
        setTitle('Updated!');
    }
    
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.item.date} />

            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">{props.item.amount}</div>
            </div>
            <button onClick={() => clickHandler()}>Click Me</button>
        </Card>
    );
};

export default ExpenseItem;
