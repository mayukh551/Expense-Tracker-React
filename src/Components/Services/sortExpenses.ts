import { itemDS } from "../../Models/Interfaces";

function sortHelper<T>(a: T, b: T, v: number): number {
    // v carries 1 or -1
    if (a < b) return -v;
    if (a > b) return v;
    return 0;
}

const sortExpenses = (sortOrder: string | null, newExpense: itemDS[]): itemDS[] => {

    if (sortOrder === "Low - High")
        newExpense.sort((a: itemDS, b: itemDS) => sortHelper(a.amount, b.amount, 1));

    else if (sortOrder === "High - Low")
        newExpense.sort((a: itemDS, b: itemDS) => sortHelper(a.amount, b.amount, -1));

    else if (sortOrder === "A - Z")
        newExpense.sort((a: itemDS, b: itemDS) => sortHelper(a.title, b.title, 1));

    else if (sortOrder === "Z - A")
        newExpense.sort((a: itemDS, b: itemDS) => sortHelper(a.title, b.title, -1));

    return newExpense;

}

export default sortExpenses;