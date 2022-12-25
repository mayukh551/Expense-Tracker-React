import { useContext } from "react";
import ListContext from "../Store/context";
import "./ExpenseDate.css";
import { ExpenseContextObj } from "../../Models/Interfaces";

const ExpenseDate: React.FC<{ date: string }> = ({ date }) => {
    const month: string = date.slice(5, 7);
    const day: string = date.slice(8);
    const year: string = date.slice(0, 4);
    const expenseCtx: ExpenseContextObj = useContext(ListContext);
    var monthName: string = expenseCtx.month[parseInt(month) - 1];

    return (
        <div className="expense-date">
            <div className="expense-date__month">{monthName}</div>
            <div className="expense-date__year">{year}</div>
            <div className="expense-date__day">{day}</div>
        </div>
    );
};

export default ExpenseDate;
