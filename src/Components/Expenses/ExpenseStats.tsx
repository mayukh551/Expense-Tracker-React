import React, { useEffect } from 'react'
import axios from 'axios';


const ExpenseStats: React.FC<any> = (props) => {

    const [purchasedAmount, setPurchasedAmount] = React.useState<number>(0);
    const [savedAmount, setSavedAmount] = React.useState<number>(0);
    const [totalItems, setTotalItems] = React.useState<number>(0);


    useEffect(() => {

        const query = `month=${props.month}&year=${props.year}`;

        axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses/stats?${query}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const { purchasedAmount, savedAmount, totalItems } = response.data.data;
                setPurchasedAmount(purchasedAmount);
                setSavedAmount(savedAmount);
                setTotalItems(totalItems);
            })
            .catch((e) => {
                console.log(e);
            });

    }, [])


    return (
        <div className="flex flex-row justify-start space-x-4">
            <PurchasedAmount data={purchasedAmount} />
            <SavedAmount data={savedAmount} />
            <TotalItems data={totalItems} />
        </div>
    )
}

const SavedAmount: React.FC<any> = ({ data }) => {

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-green-600 rounded-md py-2 px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Saved Amount</div>
            <div className="text-black text-base md:text-2xl font-bold"><span className='text-lg'>₹</span> {data}</div>
        </div>
    )
}


const PurchasedAmount: React.FC<any> = ({ data }) => {

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-purple-600 rounded-md px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Total Purchased</div>
            <div className="text-black text-base md:text-2xl font-bold"><span className='text-lg'>₹</span> {data}</div>
        </div>
    )
}

const TotalItems: React.FC<any> = ({ data }) => {

    return (
        // create a card to display the saved amount with light green background using tailwindcss
        <div className="bg-yellow-400 rounded-md px-8 w-fit flex flex-col justify-center">
            <div className="text-black text-xs md:text-sm font-bold">Total Items</div>
            <div className="text-black text-base md:text-2xl font-bold">{data}</div>
        </div>
    )
}


export default ExpenseStats;