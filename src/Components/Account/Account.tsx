import React, { useEffect, useState } from 'react'
import Nav from '../Navbar/Nav';
import ProfileCard from './ProfileCard';
import Budget from './Budget';
import Categories from './Categories';
import axios from 'axios';
import Modal from '../UI/Modal';
import AccountSpinner from '../UI/AccountSpinner';

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
    const [category, setCategory] = useState([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const updateAccount = async (data: any) => {

        const repsonse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/account/63bb013cf17c36d4dcd10ad0`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        if (repsonse.status === 200) {
            console.log("Account Updated");

            //TODO if Updated successfully, update the userContext
        }
        else {
            console.log("Error while updating account");
        }
    }

    useEffect(() => {
        //TODO : Fix This, cache the profile photo instead of retreiving it every time from server
        // if (localStorage.getItem('profilePic')) setProfilePic(localStorage.getItem('profilePic')!);
        // else localStorage.setItem('profilePic', profilePic);

        setIsLoading(true);
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
                    setCategory(category);
                    setBudget({
                        monthly: budget.monthly,
                        yearly: budget.yearly
                    });
                    setProfilePic(profile_img);
                    setIsLoading(false);
                }

            } catch (e) {
                console.log("Error while fetching data from DB", e);
            }
        }

        fetchAccountData();
        // console.log(name, email, phone, age, budget, salary, category)

    }, []);

    useEffect(() => {
        console.log(name, email, phone, age, budget, salary, category);
    }, [name, email, phone, age, budget, salary, category]);


    return (
        <div className='bg-amber-400 h-screen overflow-y-scroll'>
            <Nav hasProfile={hasVisitedProfile} />
            <Modal isOpen={isLoading} style={'px-12 py-8 pb-14'}><div className='font-semibold text-center mb-6'>Fetching . . .</div> <AccountSpinner /></Modal>
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
                <Categories />
            </div>
        </div>
    )
}

export default Account;