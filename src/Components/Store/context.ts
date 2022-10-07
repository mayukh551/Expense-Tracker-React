import React from 'react';
import itemDS from '../../Models/ItemDS';
import ExpenseContextObj from  '../../Models/expenseContextStructure'

// type ExpenseContextObj = {
//     list: itemDS[],
//     month: any[],
//     fillList: (list: itemDS[]) => void,
//     addItem: (item: itemDS) => void,
//     removeItem: (id: string) => void,
//     updateItem: (item: itemDS) => void
// }

const ListContext = React.createContext<ExpenseContextObj>({
    list: [],
    month: [],
    fillList: () => { },
    addItem: (item: itemDS) => { },
    removeItem: (id: string) => { },
    updateItem: (item: itemDS) => { }
})

export default ListContext;