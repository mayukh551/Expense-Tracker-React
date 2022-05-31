import './ExpenseDate.css'

const ExpenseDate = ({date}) => {

    // const month = date.toLocaleString("en-US", { month: "long" });
    // const day = date.toLocaleString("en-US", { day: "2-digit" });
    // const year = date.getFullYear();
    const month = date.slice(5, 7);
    const day = date.slice(8);
    const year = date.slice(0, 4);

    return (
        <div className="expense-date">
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__year'>{year}</div>
            <div className='expense-date__day'>{day}</div>
        </div>
    );
};

export default ExpenseDate;
