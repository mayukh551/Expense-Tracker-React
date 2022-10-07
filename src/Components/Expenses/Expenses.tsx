import { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import ListContext from "../Store/context";
import itemDS from "../../Models/ItemDS";

async function fetchFromDB() {
    try {
        // const listFromDb = await fetch("https://mighty-eyrie-95374.herokuapp.com/expenses/");
        const listFromDb = await fetch("https://expense-tracker-backend-bdwyx6sx0-mayukh551.vercel.app/expenses/");
        // const listFromDb = await fetch(
        //     `${process.env.REACT_APP_SERVER_URL}/expenses/`
        // );
        console.log("List from DB", listFromDb);
        var response = await listFromDb.json();
        return response;
    } catch (e) {
        console.log("Error while fetching data from DB", e);
    }
}

const Expenses = () => {
    const expenseList = useContext(ListContext);

    const [userSelectedYear, setUserSelectedYear] = useState<string | null>(
        "All"
    );
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    var newExpense: itemDS[];
    // const isListFromDbEmpty = expenseList.list.length === 0;

    if (userSelectedYear === "All") {
        newExpense = expenseList.list;
    } else {
        // store updated List of expenses
        const expense = expenseList.list.filter(
            (item: itemDS) => String(item.date.slice(0, 4)) === userSelectedYear
        );
        newExpense = expense;
    }

    const updateSelectedYear = (year: string | null): any => {
        console.log("Year : ", year);
        setUserSelectedYear(year);
    };

    const reNewList = (delItem: itemDS) => {
        console.log("In removeHandler", delItem);
        expenseList.removeItem(delItem._id);
    };

    const updateDataHandler = (item: itemDS) => {
        console.log("In updateHandler", item);
        expenseList.updateItem(item);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetchFromDB();
            var ls: itemDS[] = [];
            for (let i = 0; i < response.length; i++) {
                ls.push(response[i]);
            }

            expenseList.fillList(ls);
            setIsDataFetched((prevCond: boolean) => !prevCond);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card className="expenses">
            {/* <Chart dataPoints={newExpense} /> */}
            <ExpenseFilter updateSelectedYear={updateSelectedYear} />
            {!isDataFetched && <p>Fetching Expenses . . .</p>}
            {isDataFetched && newExpense.length === 0 ? (
                <p>No Expenses Found</p>
            ) : (
                newExpense.map((item) => {
                    return (
                        <ExpenseItem
                            key={item._id}
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
