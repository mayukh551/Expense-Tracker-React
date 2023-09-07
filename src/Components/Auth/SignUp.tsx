import React, { useState } from 'react';
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
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinners/AuthSpinner';

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitted(true);

        const userFirstName: string = firstName;
        const userLastName: string = lastName;
        const userEmail: string = email;
        const userPassword: string = password;

        if (!userFirstName || !userLastName || !userEmail || !userPassword) return;

        setIsLoading(true);

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
            name: userFirstName + ' ' + userLastName,
            email: userEmail,
            password: userPassword
        }, {
            headers: { 'Content-Type': 'application/json' },
        })

        const { isSuccess, token = '', message = '', user } = await response.data;

        if (user) {
            localStorage.setItem('userId', user.userId);
        }

        if (isSuccess) {
            setIsLoading(false);
            localStorage.setItem('token', token);
            navigate('/user_details');
        } else {
            console.log(message);
        }
    };

    return (
        <>
            <Modal isOpen={isLoading} style={`px-24`}>
                <div className='text-center mb-4 font-bold text-lg'>Authenticating</div>
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
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={submitted && !firstName}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                        helperText={submitted && !firstName ? `Please enter your first name` : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={submitted && !lastName}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                        helperText={submitted && !lastName ? `Please enter your last name` : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={submitted && !email}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        helperText={submitted && !email ? `Please enter your email address` : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={submitted && !password}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        helperText={submitted && !password ? `Please enter your password` : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link sx={{ cursor: 'pointer' }} variant="body2" onClick={() => navigate('/login')}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}