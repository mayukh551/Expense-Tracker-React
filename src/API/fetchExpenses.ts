import axios from 'axios';

async function fetchFromDB(month: string, year: string, currentPage: number, sortBy: string, itemsPerPage: number) {

    const query: string = `month=${month}&year=${year}&sortBy=${sortBy}&itemsPerPage=${itemsPerPage}&page=${currentPage}`;

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses?${query}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        console.log("List from DB", response.data.data);
        return { data: response.data.data, total: response.data.total };
    } catch (e) {
        throw new Error("Failed to load your expenses. Try again later.");
    }
}

export default fetchFromDB;