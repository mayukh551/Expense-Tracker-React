import React, { useReducer } from "react";
import { itemDS } from "../../Models/Interfaces";
import ListContext from "./context";
// import list from "../../expenseInfo.json";

type actionType =
    | { type: "FILL"; value: itemDS[] }
    | { type: "ADD"; item: itemDS }
    | { type: "REMOVE", id: string }
    | { type: "UPDATE", item: itemDS }

const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

const expenseReducer = (state: itemDS[], action: actionType) => {
    var expenseList = state;

    if (action.type === "FILL") {
        return [...action.value];
    } else if (action.type === "ADD") {
        return [...expenseList, action.item];
    } else if (action.type === "REMOVE") {
        var updatedList: itemDS[];
        console.log(action.id);
        updatedList = expenseList.filter((item: itemDS) => {
            return item.id !== action.id;
        });
        console.log("in Reduce Remove Condition", updatedList);
        return updatedList;
    } else if (action.type === "UPDATE") {
        const updatedItemIndex = expenseList.findIndex(
            (item: itemDS) => item.id === action.item!.id
        );

        expenseList[updatedItemIndex] = action.item!;
        return expenseList;
    }

    return expenseList;
};

const UniversalData: React.FC<{
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

    return (
        <ListContext.Provider
            value={{
                list: expenseState,
                month: monthNames,
                fillList: fillExpenseList,
                addItem: addItemtoList,
                removeItem: removeItemFromList,
                updateItem: updateIteminList,
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default UniversalData;