import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinners/AuthSpinner';
import Modal from '../UI/Modal'
import { validateUserDetails } from '../../utils/formValidators';

const theme = createTheme();

export default function UserDetails() {
    const navigate = useNavigate();

    const [salary, setSalary] = useState<string>('');
    const [monthlyBudget, setMonthlyBudget] = useState<string>('');
    const [yearlyBudget, setYearlyBudget] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [submitted, setSubmitted] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<any>({
        salary: '',
        monthly_budget: '',
        yearly_budget: '',
        age: '',
        phone: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        // if (!salary || !monthlyBudget || !yearlyBudget || !age || !phone) return;

        console.log(salary, monthlyBudget, yearlyBudget, age, phone);


        const validationErrors = validateUserDetails({
            salary: salary,
            monthly_budget: monthlyBudget,
            yearly_budget: yearlyBudget,
            age: age,
            phone: phone
        });

        if (validationErrors) {

            const { salary, monthly_budget, yearly_budget, age, phone } = validationErrors;

            setError({
                salary: salary || '',
                monthly_budget: monthly_budget || '',
                yearly_budget: yearly_budget || '',
                age: age || '',
                phone: phone || '',
            });

            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const data = { "salary": salary, "budget": { "monthly": monthlyBudget, "yearly": yearlyBudget }, "age": age, "phone": phone }

        // set data to local storage
        localStorage.setItem('budget', JSON.stringify(data.budget));

        const userId = localStorage.getItem('userId');

        const repsonse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/account/${userId}`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        if (repsonse.status === 200) {
            console.log("Account Updated");

        }
        else {
            console.log("Error while updating account");
        }

        setIsLoading(false);
        navigate('/expenses');

    };

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem('token'))
            setIsLoggedIn(true);
        else {
            setIsLoggedIn(false);
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(submitted && !salary, error['salary']);

    const salErr = submitted && !salary ? `Please enter your salary` : error['salary'];
    const monErr = submitted && !monthlyBudget ? `Please enter your monthly budget` : error['monthly_budget'];
    const yearErr = submitted && !yearlyBudget ? `Please enter your yearly budget` : error['yearly_budget'];
    const ageErr = submitted && !age ? `Please enter your age` : error['age'];
    const phoneErr = submitted && !phone ? `Please enter your phone number` : error['phone'];

    console.log(error);


    return (
        <>
            <div className="bg-[#b887f5] h-screen top-0 my-0 flex items-center bg-gradient-to-tr from-[#b887f5] to-[#ffffff]"  >
                {isLoggedIn && <>
                    <Modal isOpen={isLoading} style={`px-24`}>
                        <div className='text-center mb-4 font-bold text-lg'>Saving . . .</div>
                        <Spinner />
                    </Modal>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{

                                    display: 'flex',
                                    backgroundColor: 'white',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    pt: 4,
                                    pb: 4,
                                    px: [3, 5],
                                    boxShadow: 10,
                                    borderRadius: '20px'

                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                                    User Details
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        error={salErr.length > 0}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="salary"
                                        label="Salary"
                                        name="salary"
                                        type='number'
                                        autoComplete="salary"
                                        autoFocus
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setSalary(e.target.value); setError({ ...error, salary: validateUserDetails({ salary: e.target.value.trim() }).salary });
                                        }}
                                        helperText={salErr}
                                    />
                                    <TextField
                                        error={monErr.length > 0}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="monthly_budget"
                                        label="Monthly Budget"
                                        type="number"
                                        id="monthly_budget"
                                        autoComplete="monthly_budget"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setMonthlyBudget(e.target.value); setError({ ...error, monthly_budget: validateUserDetails({ monthly_budget: e.target.value.trim() }).monthly_budget });
                                        }}
                                        helperText={monErr}
                                    />
                                    <TextField
                                        error={yearErr.length > 0}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="yearly_budget"
                                        label="Yearly Budget"
                                        type="number"
                                        id="yearly_budget"
                                        autoComplete="yearly_budget"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setYearlyBudget(e.target.value); setError({ ...error, yearly_budget: validateUserDetails({ yearly_budget: e.target.value.trim() }).yearly_budget });
                                        }}
                                        helperText={yearErr}
                                    />
                                    <TextField
                                        error={ageErr.length > 0}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="age"
                                        label="Age"
                                        type="number"
                                        id="age"
                                        autoComplete="age"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAge(e.target.value); setError({ ...error, age: validateUserDetails({ age: e.target.value.trim() }).age }); }}
                                        helperText={ageErr}
                                    />
                                    <TextField
                                        error={phoneErr.length > 0}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                        id="phone"
                                        autoComplete="phone"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPhone(e.target.value); if (submitted) setError({ ...error, phone: validateUserDetails({ phone: e.target.value.trim() }).phone }); }}
                                        helperText={phoneErr}
                                    />
                                    {/* <div className="flex flex-col md:flex-row md:space-x-4 md:items-center"> */}
                                    <div className="flex flex-row space-x-4 items-center">
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, backgroundColor: '#b887f5', "&:hover": { backgroundColor: "#894cd4" } }}
                                            onClick={() => navigate('/expenses')}
                                        >
                                            Skip
                                        </Button>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, backgroundColor: '#b887f5', "&:hover": { backgroundColor: "#894cd4" } }}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>

                </>
                }
            </div>
        </>

    );
}