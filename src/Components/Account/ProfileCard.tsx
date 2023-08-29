import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/editing.png';
import AccountUICard from '../UI/AccountUICard';
import TextField from '@mui/material/TextField';

const ProfileCard: React.FC = () => {

    const [isEdit, setIsEdit] = useState(false);

    const [profilePic, setProfilePic] = useState('https://i.pravatar.cc/300'); // TODO: change this to actual image
    const [name, setName] = useState('Mayukh Bhowmick');
    const [email, setEmail] = useState('mactavish171@gmail.com');
    const [phone, setPhone] = useState('8965574365');
    const [age, setAge] = useState(26);

    const toggle = () => {
        setIsEdit(isEdit => !isEdit);
    }

    const onSave = () => {
        // set new data
        // console.log(monthlybudget, yearlybudget);
        setIsEdit(false);
    }

    const onCancel = () => {
        setIsEdit(false);
    }

    //TODO : Fix This, cache the profile photo instead of retreiving it every time from server
    useEffect(() => {
        if (localStorage.getItem('profilePic')) setProfilePic(localStorage.getItem('profilePic')!);
        else localStorage.setItem('profilePic', profilePic);
    }, []);

    return (
        <AccountUICard>
            <img src={editIcon} onClick={toggle} alt="" className='w-5 absolute right-4 top-2 cursor-pointer' />

            <div>
                <h3 className='font-bold text-2xl mb-6'>Profile</h3>
                {/* image field */}
                <div className='mb-6 flex flex-row space-x-7'>
                    <div className='w-1/3'>
                        <img src={profilePic} alt="" className='w-40 h-40 rounded-full shadow-xl' />
                    </div>
                </div>
                <div className='mb-6 flex flex-col space-y-8'>
                    <TextField
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{ readOnly: !isEdit }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{ readOnly: !isEdit }}
                    />
                    <TextField
                        id="phone"
                        label="Phone (+91)"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{ readOnly: !isEdit }}
                    />
                    <TextField
                        id="age"
                        label="Age"
                        type="number"
                        value={age}
                        onChange={(event) => setAge(parseInt(event.target.value))}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{ readOnly: !isEdit }}
                    />
                </div>
            </div>
            {isEdit && <div className='mt-7 flex flex-row space-x-7'>
                <button type="button"
                    className='px-6 py-2 rounded-md bg-purple-700 hover:bg-blue-500 text-white transition-colors duration-100'
                    onClick={onSave}
                >
                    Save
                </button>
                <button type="button"
                    className='px-6 py-2 rounded-md bg-purple-700 hover:bg-blue-500 text-white transition-colors duration-100'
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>}
        </AccountUICard>
    )
}

export default ProfileCard