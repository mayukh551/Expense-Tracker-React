import axios from "axios";
import { itemDS } from "../Models/Interfaces";


async function deleteFromDB(item: itemDS) {
    console.log("in deleteFromDB", item);
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/expenses/delete/${item.id}/`, {
        headers: {
            'x-access-token': `${localStorage.getItem('token')}`
        }
    });
}

export default deleteFromDB;