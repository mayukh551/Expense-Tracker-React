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
import { PurchasedAmount, SavedAmount, TotalItems } from './ExpenseStats';
import sendNewExpenseToServer from "../../API/createExpense";

import toast, { Toaster } from "react-hot-toast";
import NewExpenses from "../NewExpenses/NewExpenses";
import updateDataOnDB from "../../API/updateExpense";
import deleteFromDB from "../../API/deleteExpense";

const Expenses = () => {

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const userData = useContext(UserContext);
    var monthList: string[] = expenseList.month;

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [error, setError] = useState<string>('');

    var newExpense: itemDS[];

    const expensesHolder: itemDS[] = expenseList.list.slice(); // gets a copy of original list
    newExpense = sortExpenses(sortOrder, expensesHolder); // sort by user's choice / default value

    newExpense = filterExpensesByName(newExpense, searchTerm);

    const updateSelectedYear = (year: string): any => {
        localStorage.setItem("year", year);
        setUserSelectedYear(year);
    };

    const updateSelectedMonth = (month: string): any => {
        localStorage.setItem("month", month);
        setUserSelectedMonth(month);
    };

    const reNewList = (delItem: itemDS) => expenseList.removeItem(delItem.id);

    const updateSortOrder = (order: string): void => setSortOrder(order);

    const updateSearchTerm = (term: string) => setSearchTerm(term);

    const createData = (item: itemDS) => {

        const response = sendNewExpenseToServer(item);

        toast.promise(response, {
            loading: "Saving",
            success: "Saved",
            error: "Could not save"
        });
    };

    const updateData = (item: itemDS, newData: any) => {

        const response = updateDataOnDB(item, newData);

        toast.promise(response, {
            loading: "Updating",
            success: "Updated",
            error: "Could not update"
        });
    }

    const deleteData = (item: itemDS) => {

        const response = deleteFromDB(item);

        toast.promise(response, {
            loading: "Deleting",
            success: "Deleted",
            error: "Could not delete"
        });
    }

    useEffect(() => {
        async function fetchData() {

            try {

                setIsLoading(true);
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

                setIsLoading(false);

                setError('');
            }
            catch (error) {
                setIsLoading(false);
                setError("Due to some Server Error, we failed to load your expenses. Our team is working on it. Please Try again later.");
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelectedYear, userSelectedMonth]);

    return (
        <>
            {/* Toast Messages */}
            <Toaster position="bottom-left" reverseOrder={true} />

            <Card className="expenses">

                {/* Create New Expense Component */}
                <NewExpenses
                    createData={createData}
                />

                {/* Expense Options - For Sorting and Filtering */}

                <ExpenseFilter
                    updateSelectedYear={updateSelectedYear}
                    userSelectedYear={userSelectedYear}
                    userSelectedMonth={userSelectedMonth}
                    updateSelectedMonth={updateSelectedMonth}
                    sortOrder={sortOrder}
                    updateSortOrder={updateSortOrder}
                />

                {/* Expense Statistics */}

                <div className="flex flex-row justify-start space-x-2">
                    <SavedAmount expenses={newExpense} />
                    <PurchasedAmount expenses={newExpense} />
                    <TotalItems expenses={newExpense} />
                </div>

                {/* Error Modal */}
                <ErrorModal onClose={() => setError('')} message={error} />

                {/* Expense Search Bar */}
                <div className="mt-8 mb-10">
                    <SearchExpense
                        searchTerm={searchTerm}
                        updateSearchTerm={updateSearchTerm} />
                </div>

                {/* Expense List */}

                {isLoading && (
                    <ExpenseSpinner />
                )}
                {!isLoading && newExpense.length === 0 ? (
                    <p>No Expenses Found</p>
                ) : (
                    newExpense.map((item) => {
                        return (
                            <ExpenseItem
                                key={item.id}
                                item={item}
                                reNewList={reNewList}
                                updateDataHandler={updateData}
                                deleteDataHandler={deleteData}
                            />
                        );
                    })
                )}
            </Card>
        </>
    );
};

export default Expenses;