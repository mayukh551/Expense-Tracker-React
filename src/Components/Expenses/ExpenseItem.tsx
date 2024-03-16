import "./ExpenseItem.css";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import ConditionalForm from "../NewExpenses/ConditionalForm";
import Modal from "../UI/Modal";
import ListContext from "../Store/context";

const budget = JSON.parse(localStorage.getItem('budget') as string);
const itemBudget = budget?.item ?? 0;
console.log('itemBudget', itemBudget);

const ExpenseItem: React.FC<{
    item: itemDS;
    updateDataHandler: (item: itemDS, newData: any) => Promise<unknown>;
    deleteDataHandler: (item: itemDS) => void;
    selectAll: boolean;
    chosenCounter: number;
    setChosenCounter: Dispatch<SetStateAction<number>>;
    setChosenItems: Dispatch<SetStateAction<itemDS[]>>;
    chosenItems: itemDS[];
    enableOutofBudget: boolean;
}> = (props) => {
    // console.log(props.item);

    const expenseList = useContext(ListContext);

    const [title, setTitle] = useState<string>(props.item.title);
    const prevTitle = props.item.title;
    const [amount, setAmount] = useState<string>(props.item.amount);
    const prevAmount = props.item.amount;
    const [date, setDate] = useState<string>(props.item.date);
    const prevDate = props.item.date;
    const [updatedCard, setUpdatedCard] = useState<boolean>(false);

    const selectAll = props.selectAll;
    const [chosen, setChosen] = useState<boolean>(false);

    useEffect(() => {
        setChosen(selectAll);
    }, [selectAll])



    // quantity
    const [quantity, setQuantity] = useState<number>(props.item.quantity!);
    const prevQuantity = props.item.quantity!;

    const [category, setCategory] = useState<string>(props.item.category!);

    const prevCategory = props.item.category!;


    const cardUpdateHandler = () => {
        setUpdatedCard(true);
    };

    const updateDataHandler = async (item: itemDS, newData: any) => {

        newData = {
            ...newData,
            month: expenseList.month[newData.date.slice(5, 7) - 1],
            year: newData.date.slice(0, 4),
        }

        setUpdatedCard(false);
        console.log('before deleteDataHandler');
        await props.updateDataHandler(props.item, newData);
        console.log('after updateDataHandler');
        setTitle(newData.title);
        setAmount(newData.amount);
        setDate(newData.date);
        setQuantity(newData.quantity);
        setCategory(newData.category);
    }

    const cancelHandler = () => {
        setTitle(prevTitle);
        setAmount(prevAmount);
        setDate(prevDate);
        setQuantity(prevQuantity);
        setCategory(prevCategory);
        setUpdatedCard(false);
    }

    const updateChosen = () => {

        if (chosen) {
            if (props.chosenCounter > 0) {
                props.setChosenCounter(props.chosenCounter - 1);
                props.setChosenItems(props.chosenItems.filter((item) => item.id !== props.item.id));
            }
        }

        else {
            props.setChosenCounter(props.chosenCounter + 1);
            props.setChosenItems([...props.chosenItems, props.item]);
        }
        setChosen(!chosen);
    }


    const itemBgColor = props.enableOutofBudget && itemBudget > 0 && parseInt(amount) * quantity > itemBudget ?
        "bg-red-700 border-b hover:bg-red-900 dark:border-gray-700" :
        "border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700";

    return (
        // <div>

        <>
            <tr
                className={`${itemBgColor} transition duration-150 transform`}
                onClick={cardUpdateHandler}
            >
                <td
                    className="pl-6 py-4"
                    onClick={(event) => event.stopPropagation()}>
                    <input type="checkbox" className="form-checkbox rounded h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                        onClick={updateChosen}
                        checked={chosen}
                    />
                </td>
                {/* text-gray-900 whitespace-nowrap dark:text-white */}
                <th scope="row" className="px-6 py-4 font-medium">
                    {date.slice(8)}
                </th>
                {/* <td className="px-6 py-4 text-white">
                    {date.slice(8)}
                </td> */}
                <td className="px-6 py-4 text-white font-medium">
                    {title}
                </td>
                <td className="px-6 py-4">
                    {category}
                </td>
                <td className="px-6 py-4">
                    {quantity}x
                </td>
                <td className="px-6 py-4">
                    {parseInt(amount) * quantity}
                </td>
            </tr>

            {/* eslint-disable-next-line react/style-prop-object */}
            <Modal isOpen={updatedCard} style="w-1/2">
                <ConditionalForm
                    cancelHandler={cancelHandler}
                    updateExpenseToServer={updateDataHandler}
                    item={{
                        id: props.item.id,
                        title: title,
                        amount: amount,
                        date: date,
                        quantity: quantity,
                        category: category
                    }}
                    openModalHandler={setUpdatedCard}
                    op="update"
                />
            </Modal>
        </>
    );
};

export default ExpenseItem;
