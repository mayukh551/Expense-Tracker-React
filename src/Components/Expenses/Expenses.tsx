import { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseFilter from "../Expense Filter/ExpenseFilter";
import ListContext from "../Store/context";
import { ExpenseContextObj, itemDS } from "../../Models/Interfaces";
import sortExpenses from "../Services/sortExpenses";
import fetchFromDB from "../../API/fetchExpenses";
import { UserContext } from "../Store/userContext";
import filterExpensesByName from "../Services/searchFilter";
import SearchExpense from "../Expense Filter/SearchExpense";
import ExpenseSpinner from "../UI/Spinners/ExpenseSpinner";
import ErrorModal from "../UI/ErrorModal";


const Expenses = () => {

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const userData = useContext(UserContext);
    // const defaultYear = String(new Date().getFullYear());
    var monthList: string[] = expenseList.month;
    // const defaultMonth: string = monthList[new Date().getMonth()];

    console.log(userData);

    if (!localStorage.getItem('month'))
        localStorage.setItem('month', monthList[new Date().getMonth()]);
    if (!localStorage.getItem('year'))
        localStorage.setItem('year', String(new Date().getFullYear()));

    const defaultYear = localStorage.getItem('year');
    const defaultMonth = localStorage.getItem('month');

    const [userSelectedMonth, setUserSelectedMonth] = useState<string>(defaultMonth!);
    const [userSelectedYear, setUserSelectedYear] = useState<string>(defaultYear!);
    const [sortOrder, setSortOrder] = useState<string>("Recent");
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [error, setError] = useState<string>('');


    // var filteredExpense: itemDS[];
    var newExpense: itemDS[];

    const expensesHolder: itemDS[] = expenseList.list.slice(); // gets a copy of original list
    // newExpense = filterExpenses(expensesHolder, userSelectedYear, userSelectedMonth, monthList); // filter by user's choice / default value
    newExpense = sortExpenses(sortOrder, expensesHolder); // sort by user's choice / default value

    newExpense = filterExpensesByName(newExpense, searchTerm);

    const updateSelectedYear = (year: string): any => {
        console.log("Year : ", year);
        localStorage.setItem("year", year);
        setUserSelectedYear(year);
    };

    const updateSelectedMonth = (month: string): any => {
        console.log("Year : ", month);
        localStorage.setItem("month", month);
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

    const updateSearchTerm = (term: string) => {
        console.log("search term", term);
        setSearchTerm(term);
    }

    const isError = error.length > 0;


    useEffect(() => {
        async function fetchData() {

            try {

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

                console.log(userData);

                setIsDataFetched(true);

                setError('');
            }
            catch (error) {
                setError("Failed to load your expenses. Try again later.");
            }
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
            <ErrorModal isOpen={isError} onClose={() => setError('')} message={error} />
            <div className="mt-8 mb-10">
                <SearchExpense
                    searchTerm={searchTerm}
                    updateSearchTerm={updateSearchTerm} />
            </div>
            {!isDataFetched && (
                // <div className="loader"></div>
                <ExpenseSpinner />
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