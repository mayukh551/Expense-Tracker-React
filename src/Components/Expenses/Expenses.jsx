import { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import Chart from "../Chart/Chart";
import ListContext from "../Store/context";

const Expenses = (props) => {
    const expenseList = useContext(ListContext);

    const [userSelectedYear, setUserSelectedYear] = useState("All");
    var newExpense;

    if (userSelectedYear === "All") {
        newExpense = expenseList.list;
        console.log(expenseList);
        console.log(newExpense);
    } else {
        // store updated List of expenses
        const expense = expenseList.list.filter(
            (item) => String(item.date.slice(0, 4)) === userSelectedYear
        );
        newExpense = expense;
    }

    const updateSelectedYear = (year) => {
        console.log("Year : ", year);
        setUserSelectedYear(year);
    };

    const reNewList = (delItem) => {
        console.log("In removeHandler", delItem);
        expenseList.removeItem(delItem.id);
        // props.removeFromList(delItem);
    };

    const updateDataHandler = (item) => {
        console.log("In updateHandler", item);
        expenseList.updateItem(item);
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
                            updateDataHandler={updateDataHandler}
                        />
                    );
                })
            )}
        </Card>
    );
};

export default Expenses;
