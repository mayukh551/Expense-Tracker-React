import React, { useReducer } from "react";
import ListContext from "./context";
// import list from "../../expenseInfo.json";

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const expenseReducer = (state, action) => {
    var expenseList = state;

    if (action.type === "FILL") {
        return [...action.value];
    } else if (action.type === "ADD") {
        return [...expenseList, action.item];
    } else if (action.type === "REMOVE") {
        var updatedList;
        console.log(action.id);
        updatedList = expenseList.filter((item) => {
            return item._id !== action.id;
        });
        console.log("in Reduce Remove Condition", updatedList);
        return updatedList;
    } else if (action.type === "UPDATE") {
        const updatedItemIndex = expenseList.findIndex(
            (item) => item.id === action.item.id
        );

        expenseList[updatedItemIndex] = action.item;
        return expenseList;
    }

    return expenseList;
};

const UniversalData = (props) => {
    console.log("In UniversalData");
    var list = [];
    // fetchFromDB().then((data) => (list = [...data]));
    // console.log("Yes");

    const [expenseState, dispatchExpenseState] = useReducer(
        expenseReducer,
        list
    );

    const fillExpenseList = (list) => {
        dispatchExpenseState({ type: "FILL", value: list });
    };

    const addItemtoList = (item) => {
        dispatchExpenseState({ type: "ADD", item: item });
    };

    const removeItemFromList = (id) => {
        dispatchExpenseState({ type: "REMOVE", id: id });
    };
    const updateIteminList = (item) => {
        dispatchExpenseState({ type: "UDPATE", item: item });
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
