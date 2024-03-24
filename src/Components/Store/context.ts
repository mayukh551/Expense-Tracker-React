import React from 'react';
import { ExpenseContextObj, itemDS } from '../../Models/Interfaces'

const ListContext = React.createContext<ExpenseContextObj>({
    list: [],
    month: [],
    fillList: () => { },
    addItem: (item: itemDS) => { },
    removeItem: (id: string) => { },
    updateItem: (item: itemDS) => { },
    chosenCounter: 0,
    updateChosenCounter: (counter: number) => { },
    totalExpenses: 0,
    updateTotalExpenses: (total: number) => { }
})

export default ListContext;