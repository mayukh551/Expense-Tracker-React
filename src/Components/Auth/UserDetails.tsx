import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Store/userContext';
import { User } from '../../Models/Interfaces';
import Spinner from '../UI/Spinner';
import Modal from '../UI/Modal'

const theme = createTheme();

export default function UserDetails() {
    const navigate = useNavigate();

   
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        
        // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        //     email: userEmail,
        //     password: userPassword
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        // const { isSuccess, token = '', message = '', user } = await response.data;

        // console.log({
        //     isSuccess,
        //     token,
        //     user
        // });

        // if (user) {
        //     // userData.updateAge(user.age);
        //     userData.updateEmail(user.email);
        //     userData.updateName(user.name);
        //     // userData.updateSalary(user.salary);
        //     // userData.updateBudget({
        //     //     monthly: user.budget.monthly,
        //     //     yearly: user.budget.yearly
        //     // });
        // }

        // if (isSuccess) {
        //     setIsLoading(false);
        //     navigate('/expenses');
        //     localStorage.setItem('token', token);
        // }

        // else console.log(message)
    };

    const [salary, setSalary] = useState<string>('');
    const [monthlyBudget, setMonthlyBudget] = useState<string>('');
    const [yearlyBudget, setYearlyBudget] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    return (
        <>
            <Modal isOpen={isLoading} style={`px-24`}>
                <div className='text-center mb-4 font-bold text-lg'>Saving</div>
                <Spinner />
            </Modal>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            User Details
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
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
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="monthly_budget"
                                label="Monthly Budget"
                                type="number"
                                id="monthly_budget"
                                autoComplete="monthly_budget"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyBudget(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="yearly_budget"
                                label="Yearly Budget"
                                type="number"
                                id="yearly_budget"
                                autoComplete="yearly_budget"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearlyBudget(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="age"
                                label="Age"
                                type="number"
                                id="age"
                                autoComplete="age"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                type="number"
                                id="phone"
                                autoComplete="phone"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                            
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
