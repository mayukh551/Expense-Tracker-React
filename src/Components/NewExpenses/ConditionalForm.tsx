import React, { useState, SetStateAction, Dispatch } from "react";
import { itemDS } from "../../Models/Interfaces";
import "./ExpenseForm.css";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import SelectBtn from "../UI/SelectBtn";

const ConditionalForm: React.FC<{
    cancelHandler?: () => void;
    sendNewExpenseToServer?: (item: itemDS) => void;
    addNewExpense?: (item: itemDS) => void;
    updateExpenseToServer?: (item: itemDS, data: any) => void;
    openModalHandler: Dispatch<SetStateAction<boolean>>
    item?: itemDS
    op: string;
}> = (props) => {

    const categoryList: string[] = JSON.parse(localStorage.getItem('category') || '[]');
    const [enteredTitle, setEnteredTitle] = useState<string>(props.item?.title || "");
    const [enteredAmount, setEnteredAmount] = useState<string>(props.item?.amount || "");
    const [enteredDate, setEnteredDate] = useState<string>(props.item?.date || "");
    const [enteredQuantity, setEnteredQuantity] = useState<number>(props.item?.quantity || 1);
    const [enteredCategory, setEnteredCategory] = useState<string>(props.item?.category || "Select");
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const [hasSubmit, setHasSubmit] = useState<boolean>(false);

    const op = props.op;

    const submitHandler = (e: React.FormEvent) => {

        setHasSubmit(true);

        console.log("in Submit Handler of new data");
        e.preventDefault();

        var defaultCategory: string | undefined = undefined;

        if (enteredCategory === "Select") defaultCategory = "Others";

        const isInputEmpty: boolean =
            enteredTitle === "" || enteredAmount === "" || enteredDate === "";

        if (isInputEmpty) {
            setIsEmpty(true);
            return;
        }

        setIsEmpty(false);

        const newId: string = uuidv4();

        const expenseData: itemDS = {
            id: newId,
            title: enteredTitle,
            amount: enteredAmount,
            date: enteredDate,
            quantity: enteredQuantity,
            category: defaultCategory || enteredCategory
        };

        // Reseting user inputs to null
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
        setEnteredQuantity(1);
        setEnteredCategory("");

        if (op === "add") {
            props.addNewExpense!(expenseData);
        }

        else if (op === "update") {
            console.log("Updating Expense Item", expenseData)
            // update server
            props.updateExpenseToServer!(props.item!, expenseData);
        }
        // close Modal
        props.openModalHandler(false);
    };

    const isQuantityDisabled: boolean = enteredAmount !== "" && enteredAmount !== "0" ? false : true;

    if (op === "update") {
        // remove category from categoryList
        const index = categoryList.indexOf(props.item!.category!);
        if (index > -1) {
            categoryList.splice(index, 1);
        }
    }

    return (
        <div>
            <div className="new-expense__controls">
                <TextField id="filled-basic" label="Title" variant="filled"
                    className="input_title"
                    value={enteredTitle}
                    error={hasSubmit && !enteredTitle}
                    // helperText={hasSubmit && !enteredTitle ? `Enter Expense Name` : ''}
                    onChange={(e) => setEnteredTitle(e.target.value)} />
                <TextField id="filled-basic" label="Amount" variant="filled"
                    className="input_title"
                    value={parseInt(enteredAmount)}
                    type="number"
                    inputProps={{
                        min: 1
                    }}
                    error={hasSubmit && !enteredAmount}
                    // helperText={hasSubmit && !enteredAmount ? `Enter Amount` : ''}
                    onChange={(e) => {
                        setEnteredAmount(e.target.value);
                        // setEnteredQuantity(1);
                    }} />
                <TextField id="filled-basic" label="" variant="filled"
                    className="input_title"
                    value={enteredDate}
                    type="date"
                    inputProps={{
                        min: "2019-01-01",
                        max: `${new Date().getFullYear()}-12-31`
                    }}
                    error={hasSubmit && !enteredDate}
                    // helperText={hasSubmit && !enteredDate ? `Enter Date` : ''}
                    onChange={(e) => setEnteredDate(e.target.value)} />
                <TextField id="filled-basic" label="Quantity" variant="filled"
                    disabled={isQuantityDisabled}
                    className="input_title"
                    value={enteredQuantity}
                    type="number"
                    inputProps={{
                        min: 1,
                        max: 100000
                    }}
                    error={hasSubmit && !enteredQuantity}
                    // helperText={hasSubmit && !enteredQuantity ? `Enter Quantity` : ''}
                    onChange={(e) => {
                        const val: number = parseInt(e.target.value);
                        if (val < 1)
                            setEnteredQuantity(1);
                        else if (val > 100000)
                            setEnteredQuantity(100000);
                        else
                            setEnteredQuantity(val);
                    }} />
                {/* Put options for Category */}
                <SelectBtn
                    options={categoryList}
                    val={enteredCategory}
                    defaultVal={enteredCategory !== "Select" ? enteredCategory : 'Select'}
                    fontSize={'16px'}
                    selectEventHandler={(e: any) => {
                        setEnteredCategory(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-row justify-between items-center mt-10">
                <div className="flex flex-col items-start">
                    {enteredAmount && <>
                        <h1 className="text-lg font-semibold">Total Price</h1>
                        <h2>
                            <span className="text-sm">₹</span>{" "}
                            <span className="text-lg">{parseInt(enteredAmount) * enteredQuantity}</span>
                        </h2>
                    </>}
                </div>
                <div className="new-expense__actions flex flex-row justify-end space-x-3">
                    <Button
                        variant="contained"
                        size='medium'
                        onClick={props.cancelHandler}
                    >Cancel</Button>
                    <Button
                        variant="contained"
                        size='medium'
                        onClick={(e: any) => {
                            submitHandler(e);
                        }}
                    >{op === 'update' ? 'Save' : 'Add'}</Button>
                </div>
            </div>
            {hasSubmit && isEmpty && <div className="text-right mt-3 text-base text-red-400">Please fill in all the details</div>}
        </div>
    );
};

export default ConditionalForm;
