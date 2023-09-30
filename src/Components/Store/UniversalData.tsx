import React, { useReducer, useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import ListContext from "./context";
import { UserContextType } from "./userContext";
import { UserContext } from "./userContext";

type actionType =
    | { type: "FILL"; value: itemDS[] }
    | { type: "ADD"; item: itemDS }
    | { type: "REMOVE", id: string }
    | { type: "UPDATE", item: itemDS }

const monthList: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

const expenseReducer = (state: itemDS[], action: actionType) => {
    var expenseList = state;

    if (action.type === "FILL") {
        return [...action.value];
    } else if (action.type === "ADD") {
        return [action.item, ...expenseList];
    } else if (action.type === "REMOVE") {
        var updatedList: itemDS[];
        console.log(action.id);
        updatedList = expenseList.filter((item: itemDS) => {
            return item.id !== action.id;
        });
        console.log("in Reduce Remove Condition", updatedList);
        return updatedList;
    } else if (action.type === "UPDATE") {

        console.log(action.item!.title);

        const updatedItemIndex = expenseList.findIndex(
            (item: itemDS) => item.id === action.item!.id
        );

        expenseList[updatedItemIndex] = action.item!;
        return expenseList;
    }

    return expenseList;
};

export const UniversalData: React.FC<{
    children: React.ReactNode
}> = (props) => {
    console.log("In UniversalData");
    var list: itemDS[] = [];
    // fetchFromDB().then((data) => (list = [...data]));
    // console.log("Yes");

    const [expenseState, dispatchExpenseState] = useReducer(
        expenseReducer,
        list
    );

    const [chosenCounter, setChosenCounter] = useState<number>(0);

    const fillExpenseList = (list: itemDS[]) => {
        dispatchExpenseState({ type: "FILL", value: list });
    };

    const addItemtoList = (item: itemDS) => {
        dispatchExpenseState({ type: "ADD", item: item });
    };

    const removeItemFromList = (id: string) => {
        dispatchExpenseState({ type: "REMOVE", id: id });
    };
    const updateIteminList = (item: itemDS) => {
        dispatchExpenseState({ type: "UPDATE", item: item });
    };

    const updateChosenCounter = (counter: number) => {
        console.log("In updateChosenCounter");
        setChosenCounter(counter);
    };

    return (
        <ListContext.Provider
            value={{
                list: expenseState,
                month: monthList,
                fillList: fillExpenseList,
                chosenCounter: chosenCounter,
                addItem: addItemtoList,
                removeItem: removeItemFromList,
                updateItem: updateIteminList,
                updateChosenCounter: updateChosenCounter,
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};


//************************************************* USER ****************************************

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [budget, setBudget] = useState({ monthly: 0, yearly: 0 });
    const [age, setAge] = useState(0);
    const [salary, setSalary] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    console.log("In UserContextProvider");

    // write code to update age, budget and salary
    const updateBudget = (newBudget: { monthly: number, yearly: number }) => setBudget({ monthly: newBudget.monthly, yearly: newBudget.yearly });

    const updateAge = (newAge: number) => { console.log(newAge); setAge(newAge); }

    const updateSalary = (newSalary: number) => setSalary(newSalary);

    const updateName = (newName: string) => setName(newName);

    const updateEmail = (newEmail: string) => setEmail(newEmail);


    const contextValue: UserContextType = {
        budget,
        age,
        salary,
        name,
        email,
        updateBudget,
        updateAge,
        updateSalary,
        updateName,
        updateEmail
    };

    return (
        <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
    );
};
