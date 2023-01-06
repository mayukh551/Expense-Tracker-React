import React, { useEffect } from 'react'
import Analytics from './Analytics'
import Nav from '../Navbar/Nav'


const Profile: React.FC = () => {

    const hasVisitedProfile: boolean = true;

    useEffect(() => {

    })

    return (
        <div>
            <Nav hasProfile={hasVisitedProfile} />
            <div>
                <Analytics />
            </div>
        </div>
    )
}



export default Profile