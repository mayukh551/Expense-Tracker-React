import "./ExpenseItem.css";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { itemDS } from "../../Models/Interfaces";
import ConditionalForm from "../NewExpenses/ConditionalForm";
import Modal from "../UI/Modal";
import ListContext from "../Store/context";


const ExpenseItem: React.FC<{
    item: itemDS;
    updateDataHandler: (item: itemDS, newData: any) => Promise<unknown>;
    deleteDataHandler: (item: itemDS) => void;
    selectAll: boolean;
    chosenCounter: number;
    setChosenCounter: Dispatch<SetStateAction<number>>;
    setChosenItems: Dispatch<SetStateAction<itemDS[]>>;
    chosenItems: itemDS[];
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
    const [chosen, setChosen] = useState<boolean>(props.selectAll);

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
            if (props.chosenCounter > 0)
                props.setChosenCounter(props.chosenCounter - 1);
        }

        else {
            props.setChosenCounter(props.chosenCounter + 1);
            props.setChosenItems([...props.chosenItems, props.item]);
        }
        setChosen(!chosen);
    }

    return (
        // <div>

        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700"
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
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {date.slice(8)}
                </th>
                <td className="px-6 py-4 text-white">
                    {title}
                </td>
                <td className="px-6 py-4 text-white">
                    {category}
                </td>
                <td className="px-6 py-4 text-white">
                    {quantity}x
                </td>
                <td className="px-6 py-4 text-white">
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
