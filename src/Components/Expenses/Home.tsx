import React, { useState, useEffect } from 'react';
import NewExpenses from '../NewExpenses/NewExpenses'
import UniversalData from '../Store/UniversalData'
import Expenses from './Expenses'
import { useNavigate } from 'react-router-dom';

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
                    <NewExpenses />
                    <Expenses />
                </UniversalData>
            }
        </>

    )
}

export default Home