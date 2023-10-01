import React from 'react'
import './Profile.css'
import Analytics from './Analytics'
import Nav from '../Navbar/Nav'
import YearExpenseChart from './Chart/YearExpenseChart';
import MonthExpenseChart from './Chart/MonthExpenseChart';
import MonthlyCategoryExpenseChart from './Chart/MonthlyCategoryExpenseChart';
import YearlyCategoryExpenseChart from './Chart/YearlyCategoryExpenseChart';

const Profile: React.FC = () => {

    const hasVisitedProfile: boolean = true;
    return (
        <div>
            <Nav hasProfile={hasVisitedProfile} />
            <YearExpenseChart />
            <MonthExpenseChart />
            <MonthlyCategoryExpenseChart/>
            <YearlyCategoryExpenseChart/>
            <Analytics />
        </div>
    )
}



export default Profile;