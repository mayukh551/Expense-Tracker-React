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
            navigate('/');
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
                    {isConfirmed &&
                        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                    <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Deactivate account</h3>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button onClick={deleteAccount} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                                            <button onClick={() => setIsConfirmed(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </AccountUICard>
            </div>
        </div>
    )
}

export default Account;