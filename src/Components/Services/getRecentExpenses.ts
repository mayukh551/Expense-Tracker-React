import { itemDS } from "../../Models/Interfaces";

const filterExpenseByNDays = (expenseList: itemDS[], range: number): itemDS[] => {

    if(expenseList.length < range) return expenseList;

    const currentDate = new Date();
    const nDaysAgo = new Date(currentDate.getTime() - (range * 24 * 60 * 60 * 1000));
    const filteredExpenses = expenseList.filter(expense => new Date(expense.date) >= nDaysAgo);
    return filteredExpenses;
}

export default filterExpenseByNDays;