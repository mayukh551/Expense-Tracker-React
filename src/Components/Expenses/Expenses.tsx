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
import Pagination from "./Pagination";
import SelectBtn from "../UI/SelectBtn";

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

    const [option, setOption] = useState("10 / page");
    const [itemsPerPage, setItemPerPage] = useState<number>(10);

    const itemsPerPageHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(event.target.value);

        if (event.target.value === "10 / page")
            setItemPerPage(10);

        if (event.target.value === "20 / page")
            setItemPerPage(20);
        if (event.target.value === "30 / page")
            setItemPerPage(30);
    }

    var newExpense: itemDS[];

    const expensesHolder: itemDS[] = expenseList.list.slice(); // gets a copy of original list
    newExpense = sortExpenses(sortOrder, expensesHolder); // sort by user's choice / default value
    console.log("After sorting", newExpense);

    newExpense = filterExpensesByName(newExpense, searchTerm);
    console.log("After search term", newExpense)

    newExpense = filterExpenseByNDays(newExpense, range);
    console.log("After filtering by recent days", newExpense);

    const setDaysRange = (days: number) => {
        setRange(days);
    }

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

    const createData = (item: itemDS) => {

        const toastId = toast.loading("Saving . . .");

        sendNewExpenseToServer(item, currentPage, itemsPerPage).then((response) => {
            expenseList.addItem(item);
            expenseList.updateTotalExpenses(expenseList.totalExpenses + 1);
            toast.dismiss(toastId);
            toast.success("Saved");
        }).catch((err) => {
            toast.dismiss(toastId);
            toast.error("Could not save");
        });
    };

    const updateData = async (item: itemDS, newData: any) => {

        const toastId = toast.loading("Updating . . .");

        await updateDataOnDB(item, newData, currentPage, itemsPerPage).then((response) => {
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

        console.log('Chosen Items in deleteData', chosenItems);
        console.log('Chosen Counter in deleteData', chosenCounter);

        chosenItems.forEach((item) => {
            itemIDs.push(item.id);
        });

        deleteFromDB(itemIDs, userSelectedMonth, userSelectedYear, currentPage, itemsPerPage).then((response) => {
            itemIDs.forEach((id) => {
                expenseList.removeItem(id);
                expenseList.updateTotalExpenses(expenseList.totalExpenses - 1);
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


    const [currentPage, setCurrentPage] = useState<number>(1);


    // expense filters and sorting
    var yearList: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2019; year--) {
        yearList.push(year)
    }

    useEffect(() => {
        async function fetchData() {

            try {

                setIsLoading(true);
                var chosenMonth: string;
                chosenMonth = userSelectedMonth;

                const response: { data: itemDS[], total: number } = await fetchFromDB(chosenMonth,
                    userSelectedYear,
                    currentPage,
                    '',
                    itemsPerPage
                );

                const expenses = response.data;

                var ls: itemDS[] = [];
                for (let i = 0; i < expenses.length; i++)
                    ls.push(expenses[i]);

                expenseList.fillList(ls);
                expenseList.updateTotalExpenses(response.total);

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
    }, [userSelectedYear, userSelectedMonth, currentPage, itemsPerPage]);

    useEffect(() => {

        if (expenseList.list.length === 0) {
            setChosenCounter(0);
            setChosenItems([]);
        }

    }, [expenseList.list])

    const expenseLen = chosenCounter;

    const hasExpenses = newExpense.length > 0;

    console.log("Actual Expense Length in db", expenseList.totalExpenses);

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
                />

                <WarningModal
                    isOpen={isConfirmDelete}
                    onCancel={() => setIsConfirmDelete(false)}
                    message={`Are you sure you want to delete ${expenseLen} ${expenseLen > 1 ? 'expenses' : 'expense'}?`}
                    actionMessage={"Delete"}
                    onAction={deleteData}
                    heading={"Delete Expense"}
                />

                {/* Expense List */}

                {isLoading && (
                    <div className="mt-1</div>6">
                        <ExpenseSpinner />
                    </div>
                )}

                {!isLoading && !hasExpenses &&
                    <p className="mt-14 mb-3">No Expenses Found for {userSelectedMonth}, {userSelectedYear}</p>
                }
                {!isLoading && hasExpenses &&
                    <div className="relative overflow-x-auto mb-6 rounded-lg overflow-y-hidden">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6">
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

                        <div className="flex flex-row justify-between">
                            <SelectBtn
                                options={['20 / page', '30 / page']}
                                defaultVal={"10 / page"}
                                val={option}
                                selectEventHandler={itemsPerPageHandler}
                                style={{ height: '40px', backgroundColor: 'rgb(75 85 99 / 1)', font: 'inherit', color: "white", fontSize: '14px' }}
                            />
                            <Pagination expenseLen={expenseList.totalExpenses} page={currentPage} setPage={setCurrentPage} itemsPerPage={itemsPerPage} />
                        </div>
                    </div>}
            </Card>
        </div>
    );
};

export default Expenses;