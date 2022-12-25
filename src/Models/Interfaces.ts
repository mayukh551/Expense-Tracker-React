export interface itemDS {
    id: string;
    title: string;
    amount: string;
    date: string
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface ExpenseContextObj {
    list: itemDS[],
    month: string[],
    fillList: (list: itemDS[]) => void,
    addItem: (item: itemDS) => void,
    removeItem: (id: string) => void,
    updateItem: (item: itemDS) => void
}