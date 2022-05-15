import React from "react";

import "./ExpenseForm.css";

const ConditionalForm = ({
    titleChangeHandler,
    amountChangeHandler,
    dateChangeHandler,
    cancelHandler,
}) => {
    return (
        <div>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        onChange={titleChangeHandler}
                        id="title-input"
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="Date"
                        min="2019-01-01"
                        max="2022-12-31"
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit" onClick={cancelHandler}>
                    Cancel
                </button>
                <button type="submit">Add Expense</button>
            </div>
        </div>
    );
};

export default ConditionalForm;
