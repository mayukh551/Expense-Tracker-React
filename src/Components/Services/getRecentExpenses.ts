import { itemDS } from "../../Models/Interfaces";

const filterExpenseByNDays = (expenseList: itemDS[], range: number): itemDS[] => {

    if(expenseList.length < range) return expenseList;

    const sortedExpenses = expenseList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const mostRecentExpenseDate = new Date(sortedExpenses[0].date);
    mostRecentExpenseDate.setHours(0, 0, 0, 0); // Set most recent expense date to midnight

    let nDaysAgo: Date;
    if (range === 1) {
        nDaysAgo = new Date(mostRecentExpenseDate.getTime());
    } else {
        nDaysAgo = new Date(mostRecentExpenseDate.getTime() - (range * 24 * 60 * 60 * 1000));
    }

    const filteredExpenses = sortedExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        expenseDate.setHours(0, 0, 0, 0); // Set expense date to midnight
        return expenseDate >= nDaysAgo;
    });
    return filteredExpenses;
}

export default filterExpenseByNDays;
