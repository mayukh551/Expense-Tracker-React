import React from 'react'
import './Profile.css'
import Analytics from './Analytics'
import Nav from '../Navbar/Nav'
import YearExpenseChart from './Chart/YearExpenseChart';

const Profile: React.FC = () => {

    const hasVisitedProfile: boolean = true;
    return (
        <div>
            <Nav hasProfile={hasVisitedProfile} />
            <YearExpenseChart />
            <Analytics />
        </div>
    )
}



export default Profile