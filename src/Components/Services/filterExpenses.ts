import { itemDS } from "../../Models/Interfaces";

const filterExpenses = (expenseList: itemDS[], year: string) => {
    var filteredExpense: itemDS[];
    // store updated List of expenses
    filteredExpense = expenseList.filter(
        (item: itemDS) => String(item.date.slice(0, 4)) === year
    );
    console.log(filteredExpense);
    return filteredExpense;
}

export default filterExpenses;