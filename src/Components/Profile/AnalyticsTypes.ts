export type yearAnalytics = {
    year: string,
    amount: number
}

export type analytics = {
    maxExpense: {
        maxPrice: number,
        itemName: string,
        year: string
    },
    year_most_spent: yearAnalytics,
    year_least_spent: yearAnalytics
}

export class YearExpenseAnalytics {
    year: string;
    amount: number;
    constructor() {
        this.year = "";
        this.amount = 0;
    }
}
