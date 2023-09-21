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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (!salary || !monthlyBudget || !yearlyBudget || !age || !phone) return;

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
                                    px: 5,
                                    boxShadow: 10,
                                    borderRadius: '20px'

                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                                    User Details
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        error={submitted && !salary}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="salary"
                                        label="Salary"
                                        name="salary"
                                        type='number'
                                        autoComplete="salary"
                                        autoFocus
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)}
                                        helperText={submitted && !salary ? `Please enter your salary` : ''}
                                    />
                                    <TextField
                                        error={submitted && !monthlyBudget}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="monthly_budget"
                                        label="Monthly Budget"
                                        type="number"
                                        id="monthly_budget"
                                        autoComplete="monthly_budget"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyBudget(e.target.value)}
                                        helperText={submitted && !monthlyBudget ? `Please enter your monthly budget` : ''}
                                    />
                                    <TextField
                                        error={submitted && !yearlyBudget}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="yearly_budget"
                                        label="Yearly Budget"
                                        type="number"
                                        id="yearly_budget"
                                        autoComplete="yearly_budget"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearlyBudget(e.target.value)}
                                        helperText={submitted && !yearlyBudget ? `Please enter your yearly budget` : ''}
                                    />
                                    <TextField
                                        error={submitted && !age}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="age"
                                        label="Age"
                                        type="number"
                                        id="age"
                                        autoComplete="age"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                                        helperText={submitted && !age ? `Please enter your age` : ''}
                                    />
                                    <TextField
                                        error={submitted && !phone}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                        id="phone"
                                        autoComplete="phone"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                        helperText={submitted && !phone ? `Please enter your phone number` : ''}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, backgroundColor: '#b887f5', "&:hover": { backgroundColor: "#894cd4" } }}
                                    >
                                        Save
                                    </Button>

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