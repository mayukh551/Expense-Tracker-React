import axios from "axios";
import { itemDS } from "../Models/Interfaces";

const sendNewExpenseToServer = async (userData: itemDS): Promise<void> => {
    console.log(userData);

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses/new`, userData, {
        headers: {
            "Content-Type": "application/json",
            'x-access-token': `${localStorage.getItem('token')}`
        }
    })
        .then(() => console.log("New Expense Sent to backend server"))
        .catch((err) => console.log("Error:", err));
};

export default sendNewExpenseToServer;