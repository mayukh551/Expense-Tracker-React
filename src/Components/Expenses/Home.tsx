import React, { useState, useEffect } from 'react';
import NewExpenses from '../NewExpenses/NewExpenses'
import UniversalData from '../Store/UniversalData'
import Expenses from './Expenses'
import { useNavigate } from 'react-router-dom';
import Nav from '../Navbar/Nav';

const Home: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token'))
            setIsLoggedIn(true);
        else {
            setIsLoggedIn(false);
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoggedIn &&
                <UniversalData>
                    <>
                        <Nav />
                        <NewExpenses />
                        <Expenses />
                    </>
                </UniversalData>
            }
        </>

    )
}

export default Home