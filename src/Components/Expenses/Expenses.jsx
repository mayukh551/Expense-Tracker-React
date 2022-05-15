import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import Chart from "../Chart/Chart";

const Expenses = (props) => {
    const [userSelectedYear, setUserSelectedYear] = useState("2022");
    const expense = props.expenses.filter(
        (item) => String(item.date.getFullYear()) === userSelectedYear
    );

    var newExpense = expense;

    const showUpdatedList = (year) => {
        var updateExpense = props.expenses.filter(
            (item) => String(item.date.getFullYear()) === year
        );
        newExpense = [...updateExpense];
    };

    const updateSelectedYear = (year) => {
        // show updated List of expenses
        console.log("Year : ", year);
        setUserSelectedYear(year);
        showUpdatedList(year);
    };

    const reNewList = (delItem) => {
        props.removeFromList(delItem);
    };

    return (
        <Card className="expenses">
            <Chart dataPoints={newExpense} />
            <ExpenseFilter updateSelectedYear={updateSelectedYear} />
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
