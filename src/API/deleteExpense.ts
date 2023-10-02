import axios from "axios";


async function deleteFromDB(ids: string[], month: string, year: string) {
    console.log("in deleteFromDB", ids);
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses/delete/`, { ids, month, year }, {
        headers: {
            'x-access-token': `${localStorage.getItem('token')}`
        },
    });
}

export default deleteFromDB;