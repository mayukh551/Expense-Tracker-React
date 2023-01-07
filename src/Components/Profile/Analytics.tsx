import { useEffect, useState } from "react"
import { analytics, YearExpenseAnalytics } from "./AnalyticsTypes"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Analytics: React.FC = () => {
    const [hasExpenseData, setHasExpenseData] = useState<boolean>(false);
    const [expenseData, setExpenseData] = useState<analytics>({
        maxExpense: {
            maxPrice: 0,
            itemName: "",
            year: ""
        },
        year_most_spent: new YearExpenseAnalytics(),
        year_least_spent: new YearExpenseAnalytics()
    })

    useEffect(() => {
        async function fetchAnalytics(): Promise<analytics | null> {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/expenses/profile/`, {
                headers: {
                    'x-access-token': `${localStorage.getItem('token')}`,
                }
            }
            )

            const data: {
                success: boolean,
                data: analytics
            } = await response.json();

            console.log(data);

            if (data.data) return data.data;
            else return null
        }

        fetchAnalytics()
            .then((res) => {
                if (res != null) {
                    setExpenseData({
                        maxExpense: res?.maxExpense,
                        year_most_spent: res?.year_most_spent,
                        year_least_spent: res?.year_least_spent
                    })
                    setHasExpenseData(true);
                }
                else {
                    setHasExpenseData(false);
                }
            })

    }, [])

    return (
        <div><Card sx={{ minWidth: 275, maxWidth: 400, margin: 'auto', marginTop: 10 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Highest Expense till Date
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                    {hasExpenseData ? `$${expenseData.maxExpense.maxPrice} for ${expenseData.maxExpense.itemName} in ${expenseData.maxExpense.year}`
                        : 'Calculating . . .'}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Year With the Highest Total Expenses
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                    {hasExpenseData ? `$${expenseData.year_most_spent.amount} in ${expenseData.year_most_spent.year}` :
                        'Calculating . . .'}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Year With the Lowest Total Expenses
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                    {hasExpenseData ? `$${expenseData.year_least_spent.amount} in ${expenseData.year_least_spent.year}` :
                        'Calculating . . .'}
                </Typography>

            </CardContent>
        </Card></div >
    )
}

export default Analytics