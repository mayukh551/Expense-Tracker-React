import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import Chart from "../Chart/Chart";

const Expenses = (props) => {
    const [userSelectedYear, setUserSelectedYear] = useState("2022");

    useEffect(()=>{
        console.log('in Expenses.jsx, the list before filtering', props.expenses);
    }, [props.expenses]);

    const expense = (props.expenses).filter(
        (item) => String(item.date.getFullYear()) === userSelectedYear
    );

    console.log('in Expense.jsx, the list after filtering', expense);

    const [newExpense, setNewExpense] = useState([...expense]);

    useEffect(()=>{
        console.log('in Expense.jsx, the list after filtering', newExpense);
    }, [newExpense]);
    

    const showUpdatedList = (year) => {
        // console.log("In showUpdatedList function with year", year);
        var updateExpense = props.expenses.filter(
            (item) => String(item.date.getFullYear()) === year
        );
        console.log('update Expense list', updateExpense);
        setNewExpense([...updateExpense]);
    };

    const updateSelectedYear = (year) => {
        // show updated List of expenses
        console.log("Year : ", year);
        setUserSelectedYear(year);
        showUpdatedList(year);
    };

    return (
        <Card className="expenses">
            <Chart dataPoints={newExpense} />
            <ExpenseFilter updateSelectedYear={updateSelectedYear} />
            {newExpense.length === 0 ? (
                <p>No Expenses Found</p>
            ) : (
                newExpense.map((item) => {
                    return <ExpenseItem key={item.id} item={item} />;
                })
            )}
        </Card>
    );
};

export default Expenses;
