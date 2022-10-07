import itemDS from './ItemDS';

type ExpenseContextObj = {
    list: itemDS[],
    month: string[],
    fillList: (list: itemDS[]) => void,
    addItem: (item: itemDS) => void,
    removeItem: (id: string) => void,
    updateItem: (item: itemDS) => void
}

export default ExpenseContextObj;