import React, { useEffect, useState } from 'react'
import Nav from '../Navbar/Nav';
import ProfileCard from './ProfileCard';
import Budget from './Budget';
import Categories from './Categories';
import axios from 'axios';
import Modal from '../UI/Modal';
import AccountSpinner from '../UI/Spinners/AccountSpinner';
import ErrorModal from '../UI/ErrorModal';
import AccountUICard from '../UI/AccountUICard';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
    const hasVisitedProfile: boolean = true;

    const [profilePic, setProfilePic] = useState('https://i.stack.imgur.com/YaL3s.jpg'); // TODO: change this to actual image
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [budget, setBudget] = useState<any>({
        monthly: 0,
        yearly: 0
    });
    const [salary, setSalary] = useState<number>(0);
    const [category, setCategory] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<{ cond: boolean, message: string }>({ cond: true, message: 'Fetching . . .' });

    const [error, setError] = useState<string>('');

    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const navigate = useNavigate();

    const updateAccount = async (data: any) => {

        setIsLoading({ cond: true, message: 'Updating . . .' });

        const repsonse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/account/${localStorage.getItem('userId')}`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        if (repsonse.status === 200) {
            console.log("Account Updated");

            //TODO if Updated successfully, update the userContext
        }
        else {
            setError("Really sorry, but currenly due to some technical issues we failed to update your account. Please try again later.");
        }

        setIsLoading({ cond: false, message: 'Updating . . .' });
    }

    const deleteAccount = async () => {

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        setIsConfirmed(false);

        try {

            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/account/${userId}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            })

            setIsDeleted(true);

        } catch (e) {
            setError("Really sorry, but currenly due to some technical issues we failed to delete your account. Please try again later.");
        }

    }

    useEffect(() => {
        //TODO : Fix This, cache the profile photo instead of retreiving it every time from server
        // if (localStorage.getItem('profilePic')) setProfilePic(localStorage.getItem('profilePic')!);
        // else localStorage.setItem('profilePic', profilePic);

        setIsLoading({ cond: true, message: isLoading.message });
        async function fetchAccountData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/account/${localStorage.getItem('userId')}`, {
                    headers: {
                        'x-access-token': `${localStorage.getItem('token')}`
                    }
                })

                if (response.status === 200) {

                    // console.log(response.data);
                    const { data } = response;
                    console.log(data);
                    const { name, email, phone, age, budget, salary, category, profile_img } = data.data;

                    // set the state vairables
                    setName(name);
                    setEmail(email);
                    setPhone(phone);
                    setAge(age);
                    setSalary(salary);
                    // if (category.length === 0) setCategory([]);
                    setCategory([...category]);
                    setBudget({
                        monthly: budget.monthly,
                        yearly: budget.yearly
                    });
                    setProfilePic(profile_img);
                }

            } catch (e) {
                setError("Really sorry, but currenly due to some technical issues we failed to get you account details. Please try again later.");
            }

            setIsLoading({ cond: false, message: isLoading.message });
        }

        fetchAccountData();
        // console.log(name, email, phone, age, budget, salary, category)

    }, []);

    useEffect(() => {
        console.log(name, email, phone, age, budget, salary, category);
    }, [name, email, phone, age, budget, salary, category]);

    useEffect(() => {
        if (isDeleted) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        }
    }, [isDeleted, navigate]);

    return (
        <div className='bg-amber-400 h-screen overflow-y-scroll'>
            <Nav hasProfile={hasVisitedProfile} />
            <ErrorModal onClose={() => setError('')} message={error} />
            <Modal isOpen={isLoading.cond} style={'px-12 py-8 pb-14'}><div className='font-semibold text-center mb-6'>{isLoading.message}</div> <AccountSpinner /></Modal>
            <div className='pb-20'>
                <ProfileCard
                    name={name}
                    email={email}
                    phone={phone}
                    age={age}
                    profilePic={profilePic}
                    updateAccount={updateAccount}
                    setName={setName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setAge={setAge}
                />
                <Budget setBudget={setBudget} monthly={budget.monthly} yearly={budget.yearly} updateAccount={updateAccount} />
                <Categories updateAccount={updateAccount} categories={category} setCategory={setCategory} />
                <AccountUICard>
                    {/* create a delete account section */}
                    <div className='flex flex-col justify-center'>
                        <h2 className='font-semibold text-lg mb-6'>Permanently delete you Account</h2>
                        <button
                            onClick={() => setIsConfirmed(true)}
                            className='w-full lg:w-1/3  bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-lg'>Delete Account</button>
                    </div>
                    {isConfirmed && <Modal isOpen={isConfirmed} >
                        {/* create a yes or no div option */}
                        <div className='flex flex-col justify-center'>
                            <h2 className='font-semibold text-lg mb-6'>Are you sure you want to delete your account?</h2>
                            <div className='flex justify-around'>
                                <button
                                    onClick={() => setIsConfirmed(false)}
                                    className='w-1/3 bg-green-500 text-white px-4 py-2 rounded-md font-semibold text-lg'>No</button>
                                <button
                                    onClick={deleteAccount}
                                    className='w-1/3 bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-lg'>Yes</button>
                            </div>
                        </div>
                    </Modal>}
                </AccountUICard>
            </div>
        </div>
    )
}

export default Account;