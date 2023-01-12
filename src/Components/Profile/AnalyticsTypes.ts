export interface monthAnalytics {
    month: string,
    amount: number
}

export interface yearAnalytics {
    totalPurchaseAmount: number,
    totalItems: number,
    highestExpense: number,
    lowestExpense: number
}

export interface analytics {
    year_stats: yearAnalytics,
    month_stats: {
        highExpenseMonthDetails: monthAnalytics,
        lowExpenseMonthDetails: monthAnalytics
    }
}

export class YearExpenseAnalytics {
    totalPurchaseAmount: number;
    totalItems: number;
    highestExpense: number;
    lowestExpense: number;
    constructor(totalPurchaseAmount: number, totalItems: number, highestExpense: number, lowestExpense: number) {
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.totalItems = totalItems;
        this.highestExpense = highestExpense;
        this.lowestExpense = lowestExpense;
    }
}

export class MonthExpenseAnalytics {
    month: string;
    amount: number;
    constructor(month: string, amount: number) {
        this.month = month;
        this.amount = amount;
    }
}
