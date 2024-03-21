import { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ListContext from "../Store/context";
import { ExpenseContextObj, itemDS } from "../../Models/Interfaces";
import sortExpenses from "../Services/sortExpenses";
import fetchFromDB from "../../API/fetchExpenses";
import { UserContext } from "../Store/userContext";
import filterExpensesByName from "../Services/searchFilter";
import filterExpenseByNDays from "../Services/getRecentExpenses";
import SearchExpense from "../Expense Filter/SearchExpense";
import ExpenseSpinner from "../UI/Spinners/ExpenseSpinner";
import ErrorModal from "../UI/ErrorModal";
import { PurchasedAmount, SavedAmount, TotalItems } from './ExpenseStats';
import sendNewExpenseToServer from "../../API/createExpense";

import toast, { Toaster } from "react-hot-toast";
import NewExpenses from "../NewExpenses/NewExpenses";
import updateDataOnDB from "../../API/updateExpense";
import deleteFromDB from "../../API/deleteExpense";
import WarningModal from "../UI/WarningModal";
import ExpenseControls from "./ExpenseControls";

const Expenses = () => {

    const expenseList: ExpenseContextObj = useContext(ListContext);
    const userData = useContext(UserContext);
    var monthList: string[] = expenseList.month;

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
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const [chosenItems, setChosenItems] = useState<itemDS[]>([]);

    const [error, setError] = useState<string>('');

    const [chosenCounter, setChosenCounter] = useState<number>(0);

    const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

    const [enableOutofBudget, setEnableOutofBudget] = useState<boolean>(true);

    const [range, setRange] = useState<number>(30);

    const [reload, setReload] = useState<boolean>(false);



    var newExpense: itemDS[];

    const expensesHolder: itemDS[] = expenseList.list.slice(); // gets a copy of original list

    //* filters and sorts the expenses
    newExpense = sortExpenses(sortOrder, expensesHolder); // sort by user's choice / default value
    newExpense = filterExpensesByName(newExpense, searchTerm);
    newExpense = filterExpenseByNDays(newExpense, range);


    //* functions to update the state variables
    const setDaysRange = (days: number) => setRange(days);

    const updateSelectedYear = (year: string): any => {
        localStorage.setItem("year", year);
        setUserSelectedYear(year);
    };

    const updateSelectedMonth = (month: string): any => {
        localStorage.setItem("month", month);
        setUserSelectedMonth(month);
    };

    const updateSortOrder = (order: string): void => setSortOrder(order);

    const updateSearchTerm = (term: string) => setSearchTerm(term);

    const selectAllHandler = () => {
        if (selectAll) {
            setChosenCounter(0);
            setChosenItems([]);
        }
        else {
            setChosenCounter(newExpense.length);
            setChosenItems([...newExpense]);
        }

        setSelectAll(!selectAll);
    }


    //* functions to interact with the server, react context and send react-toast messages
    const createData = (item: itemDS) => {

        const toastId = toast.loading("Saving . . .");

        sendNewExpenseToServer(item).then((response) => {
            expenseList.addItem(item);
            toast.dismiss(toastId);
            toast.success("Saved");
        }).catch((err) => {
            toast.dismiss(toastId);
            toast.error("Could not save");
        });
    };

    const updateData = async (item: itemDS, newData: any) => {

        const toastId = toast.loading("Updating . . .");

        await updateDataOnDB(item, newData).then((response) => {
            expenseList.updateItem(newData);
            toast.dismiss(toastId);
            toast.success("Updated");
        }).catch((err) => {
            toast.dismiss(toastId);
            toast.error("Could not update");
        });
    }

    const deleteData = (item: itemDS) => {

        setIsConfirmDelete(false);

        const toastId = toast.loading("Deleting . . .");

        const itemIDs: string[] = [];

        chosenItems.forEach((item) => {
            itemIDs.push(item.id);
        });

        deleteFromDB(itemIDs, userSelectedMonth, userSelectedYear).then((response) => {
            itemIDs.forEach((id) => {
                expenseList.removeItem(id);
            });
            setChosenCounter(0);
            setChosenItems([]);
            toast.dismiss(toastId);
            toast.success("Deleted");
        }).catch((err) => {
            toast.dismiss(toastId);
            toast.error("Could not delete");
        });
    }


    // expense filters and sorting
    var yearList: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(year)
    }


    async function fetchData() {

        try {

            setIsLoading(true);
            var chosenMonth: string;
            chosenMonth = userSelectedMonth;

            const response: itemDS[] = await fetchFromDB(chosenMonth, userSelectedYear, '');
            var ls: itemDS[] = [];
            for (let i = 0; i < response.length; i++)
                ls.push(response[i]);

            expenseList.fillList(ls);

            console.log(userData);

            setIsLoading(false);

            setReload(false);

            setError('');
        }
        catch (error) {
            setIsLoading(false);
            setError("Due to some Server Error, we failed to load your expenses. Our team is working on it. Please Try again later.");
        }
    }


    //* useEffect to fetch data from the server based on user's selected month and year and to reload the data when reload is true

    useEffect(() => {

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelectedYear, userSelectedMonth]);


    useEffect(() => {

        if (reload) fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);


    useEffect(() => {

        if (expenseList.list.length === 0) {
            setChosenCounter(0);
            setChosenItems([]);
        }

    }, [expenseList.list])

    const expenseLen = chosenCounter;

    const hasExpenses = newExpense.length > 0;

    return (
        <div>
            {/* Toast Messages */}
            <Toaster position="bottom-left" reverseOrder={true} />

            <Card className="expenses">

                {/* Create New Expense Component */}
                <NewExpenses
                    createData={createData}
                />

                {/* Expense Statistics */}

                <div className="flex flex-row justify-start space-x-4">
                    <SavedAmount expenses={newExpense} />
                    <PurchasedAmount expenses={newExpense} />
                    <TotalItems expenses={newExpense} />
                </div>

                {/* Error Modal */}
                <ErrorModal onClose={() => setError('')} message={error} />

                {/* Expense Search Bar */}

                <div className="mt-8 mb-8">
                    <SearchExpense
                        searchTerm={searchTerm}
                        updateSearchTerm={updateSearchTerm} />
                </div>

                {/* Expense Options - For Sorting and Filtering */}

                <ExpenseControls
                    hasExpenses={hasExpenses}
                    chosenCounter={chosenCounter}
                    expenseLen={expenseLen}
                    setIsConfirmDelete={setIsConfirmDelete}
                    enableOutofBudget={enableOutofBudget}
                    setEnableOutofBudget={setEnableOutofBudget}
                    setDaysRange={setDaysRange}
                    userSelectedMonth={userSelectedMonth}
                    updateSelectedMonth={updateSelectedMonth}
                    userSelectedYear={userSelectedYear}
                    updateSelectedYear={updateSelectedYear}
                    sortOrder={sortOrder}
                    updateSortOrder={updateSortOrder}
                    monthList={monthList}
                    yearList={yearList}
                    refresh={() => setReload(true)}
                />

                <WarningModal
                    isOpen={isConfirmDelete}
                    onCancel={() => setIsConfirmDelete(false)}
                    message={`Are you sure you want to delete ${expenseLen} ${expenseLen > 1 ? 'expenses' : 'expense'}?`}
                    actionMessage={"Delete"}
                    onAction={deleteData}
                    heading={"Delete Expense"}
                />


                {/* Spinner */}

                {isLoading && (
                    <div className="mt-1</div>6">
                        <ExpenseSpinner />
                    </div>
                )}

                {!isLoading && !hasExpenses &&
                    <p className="mt-14 mb-3">No Expenses Found for {userSelectedMonth}, {userSelectedYear}</p>
                }
                {!isLoading && hasExpenses &&
                    <div className="relative overflow-x-auto mb-6 rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="pl-6 py-4">
                                        <input type="checkbox" className="form-checkbox cursor-pointer rounded h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            onClick={selectAllHandler}
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Day
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {newExpense.map((item) => {
                                    return (
                                        <ExpenseItem
                                            key={item.id}
                                            item={item}
                                            updateDataHandler={updateData}
                                            deleteDataHandler={deleteData}
                                            selectAll={selectAll}
                                            chosenCounter={chosenCounter}
                                            setChosenCounter={setChosenCounter}
                                            setChosenItems={setChosenItems}
                                            chosenItems={chosenItems}
                                            enableOutofBudget={enableOutofBudget}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>}
            </Card>
        </div>
    );
};

export default Expenses;