import axios from "axios";
import { itemDS } from "../Models/Interfaces";

async function updateDataOnDB(item: itemDS, updatedData: any) {
    console.log("updateDataOnDB");

    const { date, title, amount, quantity } = updatedData;

    const newItem: itemDS = {
        id: item.id,
        date: date,
        title: title,
        amount: amount,
        quantity: quantity,
    };
    console.log(newItem);
    await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/expenses/update/${item.id}`, newItem, {
        headers: {
            "content-type": "application/json",
            'x-access-token': `${localStorage.getItem('token')}`
        }
    });
}

export default updateDataOnDB;