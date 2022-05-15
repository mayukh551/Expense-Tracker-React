import { useState } from "react";
import Expenses from "./Components/Expenses/Expenses";
import NewExpenses from "./Components/NewExpenses/NewExpenses";

function App() {
    const [expenseList, setExpenseList] = useState([
        {
            id: "e1",
            title: "Car Insurance",
            amount: "$354.54",
            date: new Date(2019, 7, 14),
        },
        {
            id: "e2",
            title: "Toilet Paper",
            amount: "$54.50",
            date: new Date(2020, 3, 24),
        },
        {
            id: "e3",
            title: "Groceries",
            amount: "$154.57",
            date: new Date(2020, 5, 15),
        },
        {
            id: "e4",
            title: "Gas",
            amount: "$298.54",
            date: new Date(2019, 6, 11),
        }
    ]);

    const updateList = (newExpenseData) => {
        console.log('in App.jsx Recieved expense data from NewExpenses.jsx', newExpenseData);
        setExpenseList([...expenseList, newExpenseData]);
    }

    console.log('Updated List :', expenseList);

    return (
        <div className="App">
			<NewExpenses updateList={updateList} expenses={expenseList} />
            <Expenses expenses={expenseList} />
        </div>
    );
}

export default App;
