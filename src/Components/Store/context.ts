import React from 'react';
import { ExpenseContextObj, itemDS } from '../../Models/Interfaces'

const ListContext = React.createContext<ExpenseContextObj>({
    list: [],
    month: [],
    fillList: () => { },
    addItem: (item: itemDS) => { },
    removeItem: (id: string) => { },
    updateItem: (item: itemDS) => { }
})

export default ListContext;