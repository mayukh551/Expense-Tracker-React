import axios from 'axios';

async function fetchFromDB(month: string, year: string, sortBy: string) {

    const query: string = `month=${month}&year=${year}&sortBy=${sortBy}`;

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses?${query}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        console.log("List from DB", response.data);
        return response.data;
    } catch (e) {
        throw new Error("Failed to load your expenses. Try again later.");
    }
}

export default fetchFromDB;