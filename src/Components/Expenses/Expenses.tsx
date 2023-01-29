import { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import ListContext from "../Store/context";
import { ExpenseContextObj, itemDS } from "../../Models/Interfaces";
import axios from "axios";

async function fetchFromDB() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses/`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        console.log("List from DB", response.data);
        return response.data;
    } catch (e) {
        console.log("Error while fetching data from DB", e);
    }
}

function sortExpenses<T>(a: T, b: T, v: number): number {
    // v carries 1 or -1
    if (a < b) return -v;
    if (a > b) return v;
    return 0;
}

const Expenses = () => {
    const expenseList: ExpenseContextObj = useContext(ListContext);

    const [userSelectedYear, setUserSelectedYear] = useState<string | null>("All");
    const [sortOrder, setSortOrder] = useState<string | null>("");
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    var filteredExpense: itemDS[];
    var newExpense: itemDS[];

    if (userSelectedYear === "All") filteredExpense = expenseList.list.slice();
    else {
        // store updated List of expenses
        filteredExpense = expenseList.list.filter(
            (item: itemDS) => String(item.date.slice(0, 4)) === userSelectedYear
        );
        console.log(filteredExpense);
    }

    newExpense = filteredExpense.slice();

    if (sortOrder === "Low - High")
        newExpense.sort((a: itemDS, b: itemDS) => sortExpenses(a.amount, b.amount, 1));

    else if (sortOrder === "High - Low")
        newExpense.sort((a: itemDS, b: itemDS) => sortExpenses(a.amount, b.amount, -1));

    else if (sortOrder === "A - Z")
        newExpense.sort((a: itemDS, b: itemDS) => sortExpenses(a.title, b.title, 1));

    else if (sortOrder === "Z - A")
        newExpense.sort((a: itemDS, b: itemDS) => sortExpenses(a.title, b.title, -1));



    const updateSelectedYear = (year: string | null): any => {
        console.log("Year : ", year);
        setUserSelectedYear(year);
    };

    const reNewList = (delItem: itemDS) => {
        console.log("In removeHandler", delItem);
        expenseList.removeItem(delItem.id);
    };

    const updateDataHandler = (item: itemDS) => {
        console.log("In updateHandler", item);
        expenseList.updateItem(item);
    };

    const updateSortOrder = (order: string | null): void => {
        console.log("sort function", order);
        setSortOrder(order);
    }

    useEffect(() => {
        async function fetchData() {
            // await fetchFromDB();
            const response: itemDS[] = await fetchFromDB();
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
            <ExpenseFilter
                updateSelectedYear={updateSelectedYear}
                userSelectedYear={userSelectedYear}
                sortOrder={sortOrder}
                updateSortOrder={updateSortOrder}
            />
            {!isDataFetched && (
                <div className="loader"></div>
            )}
            {isDataFetched && newExpense.length === 0 ? (
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
