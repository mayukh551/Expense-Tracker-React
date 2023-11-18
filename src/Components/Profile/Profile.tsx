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
            <div className='w-screen overflow-x-hidden bg-gradient-to-tr from-[#b887f5] to-[#ffffff]'>
                <YearExpenseChart />
                <MonthExpenseChart />
                <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 justify-center items-center my-10'>
                    <CategoryPieChart />
                    <MonthlyExpensePieChart />
                </div>
                <Analytics />
            </div>
        </div>
    )
}



export default Profile;