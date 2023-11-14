import { useEffect, useState } from "react"
import { analytics, MonthExpenseAnalytics, YearExpenseAnalytics } from "./AnalyticsTypes"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Analytics.css'

const Analytics: React.FC = () => {
    const [hasExpenseData, setHasExpenseData] = useState<boolean>(false);
    const [expenseData, setExpenseData] = useState<analytics>({
        year_stats: new YearExpenseAnalytics(0, 0, 0, 0),
        month_stats: {
            highExpenseMonthDetails: new MonthExpenseAnalytics('', 0),
            lowExpenseMonthDetails: new MonthExpenseAnalytics('', 0)
        }
    })

    useEffect(() => {
        async function fetchAnalytics(): Promise<analytics | null> {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/profile/`, {
                headers: {
                    'x-access-token': `${localStorage.getItem('token')}`,
                }
            })

            const data: {
                success: boolean,
                data: analytics
            } = await response.json();

            // console.log(data);

            if (data.data != null) return data.data;
            else return null
        }

        fetchAnalytics()
            .then((res) => {
                console.log(res);
                if (res != null) {
                    console.log(res);
                    const { totalPurchaseAmount, totalItems, highestExpense, lowestExpense } = res.year_stats;
                    const { highExpenseMonthDetails, lowExpenseMonthDetails } = res.month_stats;
                    setExpenseData({
                        year_stats: new YearExpenseAnalytics(totalPurchaseAmount, totalItems, highestExpense, lowestExpense),
                        month_stats: {
                            highExpenseMonthDetails: new MonthExpenseAnalytics(
                                highExpenseMonthDetails.month,
                                highExpenseMonthDetails.amount),
                            lowExpenseMonthDetails: new MonthExpenseAnalytics(
                                lowExpenseMonthDetails.month,
                                lowExpenseMonthDetails.amount),
                        }
                    })
                    setHasExpenseData(true);
                }
                else {
                    setHasExpenseData(false);
                }
            })

    }, [])

    return (
        <div className="analytics-stats-container">
            <Card sx={{display:'flex',justifyContent:'center', minWidth: 275, maxWidth: 400, backgroundColor: '#ffb703', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="text.primary" fontWeight={600} gutterBottom>
                        Year Stats
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total Expenditure this year
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? expenseData.year_stats.totalPurchaseAmount : 'Calculating . . .'}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total no. of items bought
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? expenseData.year_stats.totalItems : 'Calculating . . .'}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Highest Expense
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? expenseData.year_stats.highestExpense : 'Calculating . . .'}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Lowest Expense
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? expenseData.year_stats.lowestExpense : 'Calculating . . .'}
                    </Typography>

                </CardContent>
            </Card>


            {/* <Card sx={{ minWidth: 275, maxWidth: 400, backgroundColor: '#ffb703', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="text.primary" fontWeight={600} gutterBottom>
                        Month Stats
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Month with the most expenses
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? `$${expenseData.month_stats.highExpenseMonthDetails.amount} in ${expenseData.month_stats.highExpenseMonthDetails.month}` : 'Calculating . . .'}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Month with the lowest expenses
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                        {hasExpenseData ? `$${expenseData.month_stats.lowExpenseMonthDetails.amount} in ${expenseData.month_stats.lowExpenseMonthDetails.month}` : 'Calculating . . .'}
                    </Typography>
                </CardContent>
            </Card> */}
        </div >
    )
}

export default Analytics