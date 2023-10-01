import React from 'react'
import './Profile.css'
import Analytics from './Analytics'
import Nav from '../Navbar/Nav'
import YearExpenseChart from './Chart/YearExpenseChart';
import MonthExpenseChart from './Chart/MonthExpenseChart';
import MonthlyExpensePieChart from './Chart/MonthlyExpensePieChart';
import CategoryPieChart from './Chart/CategoryPieChart';

const Profile: React.FC = () => {

    const hasVisitedProfile: boolean = true;
    return (
        <div>
            <Nav hasProfile={hasVisitedProfile} />
            <YearExpenseChart />
            <MonthExpenseChart />
            <div className='flex flex-row space-x-5 justify-center items-center my-10'>
                <CategoryPieChart />
                <MonthlyExpensePieChart />
            </div>
            <Analytics />
        </div>
    )
}



export default Profile;