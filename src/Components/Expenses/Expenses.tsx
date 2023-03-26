import { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import ListContext from "../Store/context";
import { ExpenseContextObj, itemDS } from "../../Models/Interfaces";
import axios from "axios";
import sortExpenses from "../Services/sortExpenses";
import { useCookies } from 'react-cookie';


async function fetchFromDB(month: string, year: string, sortBy: string) {

    const query: string = `month=${month}&year=${year}&sortBy=${sortBy}`;

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses?${query}`, {
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


const Expenses = () => {
    const [cookies, setCookie] = useCookies(['month', 'year']);

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const defaultYear = String(new Date().getFullYear());
    var monthList: string[] = expenseList.month;
    const defaultMonth: string = monthList[new Date().getMonth()];

    if (!cookies.month)
        setCookie('month', defaultMonth);
    if (!cookies.year)
        setCookie('year', defaultYear);

    const [userSelectedYear, setUserSelectedYear] = useState<string>(cookies.year);
    const [userSelectedMonth, setUserSelectedMonth] = useState<string>(cookies.month);
    const [sortOrder, setSortOrder] = useState<string>("Recent");
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);


    // var filteredExpense: itemDS[];
    var newExpense: itemDS[];

    const expensesHolder: itemDS[] = expenseList.list.slice(); // gets a copy of original list
    // newExpense = filterExpenses(expensesHolder, userSelectedYear, userSelectedMonth, monthList); // filter by user's choice / default value
    newExpense = sortExpenses(sortOrder, expensesHolder); // sort by user's choice / default value

    const updateSelectedYear = (year: string): any => {
        console.log("Year : ", year);
        setCookie("year", year);
        setUserSelectedYear(year);
    };

    const updateSelectedMonth = (month: string): any => {
        console.log("Year : ", month);
        setCookie("month", month);
        setUserSelectedMonth(month);
    };

    const reNewList = (delItem: itemDS) => {
        console.log("In removeHandler", delItem);
        expenseList.removeItem(delItem.id);
    };

    const updateDataHandler = (item: itemDS) => {
        console.log("In updateHandler", item);
        expenseList.updateItem(item);
    };

    const updateSortOrder = (order: string): void => {
        console.log("sort function", order);
        setSortOrder(order);
    }

    useEffect(() => {
        async function fetchData() {
            setIsDataFetched(false);
            var chosenMonth: string;
            if (expenseList.month.indexOf(userSelectedMonth) + 1 <= 9)
                chosenMonth = `0${expenseList.month.indexOf(userSelectedMonth) + 1}`
            else
                chosenMonth = `${expenseList.month.indexOf(userSelectedMonth) + 1}`

            const response: itemDS[] = await fetchFromDB(chosenMonth, userSelectedYear, '');
            var ls: itemDS[] = [];
            for (let i = 0; i < response.length; i++)
                ls.push(response[i]);

            expenseList.fillList(ls);
            setIsDataFetched(true);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelectedYear, userSelectedMonth]);

    return (
        <Card className="expenses">
            <ExpenseFilter
                updateSelectedYear={updateSelectedYear}
                userSelectedYear={userSelectedYear}
                userSelectedMonth={userSelectedMonth}
                updateSelectedMonth={updateSelectedMonth}
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