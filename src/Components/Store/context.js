import React from 'react';

const ListContext = React.createContext({
    list: [],
    month: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    updateItem: (item) => { }
})

export default ListContext;