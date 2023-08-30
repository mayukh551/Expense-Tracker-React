import { itemDS } from "../../Models/Interfaces";

const filterExpensesByName = (expenses: itemDS[], searchTerm: string): itemDS[] => {

    // if search term is empty, return the original list
    if (searchTerm === '') return expenses;

    let filterExpenses: itemDS[] = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filterExpenses.length === 0 ? expenses : filterExpenses;
};

export default filterExpensesByName;