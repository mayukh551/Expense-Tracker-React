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

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();

    const userData = useContext(UserContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [userState, setUserState] = useState<User>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userEmail = email;
        const userPassword = password;
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            email: userEmail,
            password: userPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { isSuccess, token = '', message = '', user } = await response.data;

        console.log({
            isSuccess,
            token,
            user
        });

        if (user) {
            // userData.updateAge(user.age);
            userData.updateEmail(user.email);
            userData.updateName(user.name);
            // userData.updateSalary(user.salary);
            // userData.updateBudget({
            //     monthly: user.budget.monthly,
            //     yearly: user.budget.yearly
            // });
        }

        if (isSuccess) {
            navigate('/expenses');
            localStorage.setItem('token', token);
        }

        else console.log(message)
    };

    // useEffect(() => {

    //     if (userState) {
    //         console.log('hey there');
    //         userData.updateAge(userState.age);
    //         userData.updateEmail(userState.email);
    //         userData.updateName(userState.name);
    //         userData.updateSalary(userState.salary);
    //         userData.updateBudget({
    //             monthly: userState.budget.monthly,
    //             yearly: userState.budget.yearly
    //         });
    //     }
    // }, [userState]);

    return (
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/')} variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}