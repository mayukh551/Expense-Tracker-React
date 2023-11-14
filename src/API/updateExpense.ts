import axios from "axios";
import { itemDS } from "../Models/Interfaces";

async function updateDataOnDB(item: itemDS, updatedData: any) {
    console.log("updateDataOnDB");

    const { date, title, amount, quantity, category, month, year } = updatedData;

    const newItem: itemDS = {
        id: item.id,
        date, title, amount, quantity, category, month, year
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