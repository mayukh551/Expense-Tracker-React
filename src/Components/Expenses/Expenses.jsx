import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import Chart from "../Chart/Chart";

const Expenses = (props) => {
    const [userSelectedYear, setUserSelectedYear] = useState("All");
    console.log("From top of Expense");
    var newExpense;

    if (userSelectedYear === "All") newExpense = props.expenses;
    else {
        // store updated List of expenses
        const expense = props.expenses.filter(
            (item) => String(item.date.getFullYear()) === userSelectedYear
        );
        newExpense = expense;
    }

    const updateSelectedYear = (year) => {
        console.log("Year : ", year);
        setUserSelectedYear(year);
    };

    const reNewList = (delItem) => {
        props.removeFromList(delItem);
    };

    return (
        <Card className="expenses">
            <Chart dataPoints={newExpense} />
            <ExpenseFilter updateSelectedYear={updateSelectedYear} />
            {console.log(newExpense)}
            {newExpense.length === 0 ? (
                <p>No Expenses Found</p>
            ) : (
                newExpense.map((item) => {
                    return (
                        <ExpenseItem
                            key={item.id}
                            item={item}
                            reNewList={reNewList}
                        />
                    );
                })
            )}
        </Card>
    );
};

export default Expenses;
