import { itemDS } from "../../Models/Interfaces";

const filterExpenses = (expenseList: itemDS[], year: string, month: string, monthList: string[]): itemDS[] => {
    var filteredExpense: itemDS[];
    // store updated List of expenses
    filteredExpense = expenseList.filter(
        (item: itemDS) => {
            console.log(parseInt(item.date.slice(5, 7)), monthList.indexOf(month) + 1);
            return String(item.date.slice(0, 4)) === year &&
                parseInt(item.date.slice(5, 7)) === (monthList.indexOf(month) + 1)
        }
    );
    return filteredExpense;
}

export default filterExpenses;