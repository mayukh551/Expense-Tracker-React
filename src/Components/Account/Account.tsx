import React from 'react'
import Nav from '../Navbar/Nav';
import ProfileCard from './ProfileCard';
import Budget from './Budget';
import Categories from './Categories';

const Account: React.FC = () => {
    const hasVisitedProfile: boolean = true;

    return (
        <div className='bg-amber-400 h-screen overflow-y-scroll'>
            <Nav hasProfile={hasVisitedProfile} />
            <div className='pb-20'>
                <ProfileCard />
                <Budget />
                <Categories />
            </div>
        </div>
    )
}

export default Account;