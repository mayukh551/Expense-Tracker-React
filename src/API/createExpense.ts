import axios from "axios";
import { itemDS } from "../Models/Interfaces";

const sendNewExpenseToServer = async (userData: itemDS): Promise<string> => {
    console.log(userData);

    return new Promise(async (resolve, reject) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses/new`, userData, {
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });

            resolve("New Expense Sent to backend server");

        } catch (err) {
            reject(err);
        }
    });


};

export default sendNewExpenseToServer;
