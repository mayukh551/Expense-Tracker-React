import React from 'react'
import { itemDS } from '../../Models/Interfaces';

export const SavedAmount: React.FC<any> = (props) => {

    const expenses: itemDS[] = props.expenses;

    var totalAmount: number = 0;
    var budget = JSON.parse(localStorage.getItem('budget') as string);

    if (!budget) return null;

    var monthlyBudget = budget.monthly;

    expenses.forEach((expense) => {
        totalAmount += parseInt(expense.amount);
    });

    var saved = monthlyBudget - totalAmount;

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-green-600 rounded-md py-2 px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Saved Amount</div>
            <div className="text-black text-base md:text-2xl font-bold"><span className='text-lg'>₹</span> {saved}</div>
        </div>
    )
}


export const PurchasedAmount: React.FC<any> = (props) => {

    const expenses: itemDS[] = props.expenses;

    var totalAmount: number = 0;

    expenses.forEach((expense) => {
        totalAmount += parseInt(expense.amount);
    });

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-purple-600 rounded-md px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Total Purchased</div>
            <div className="text-black text-base md:text-2xl font-bold"><span className='text-lg'>₹</span> {totalAmount}</div>
        </div>
    )
}

export const TotalItems: React.FC<any> = (props) => {

    const expenses: itemDS[] = props.expenses;

    let totalItems: number = 0;

    expenses.forEach(expense => {
        totalItems += expense.quantity!;
    })

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-yellow-400 rounded-md px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Total Items</div>
            <div className="text-black text-base md:text-2xl font-bold">{totalItems}</div>
        </div>
    )
}

