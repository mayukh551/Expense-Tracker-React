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
import Spinner from '../UI/Spinners/AuthSpinner';
import Modal from '../UI/Modal'
import ErrorModal from '../UI/ErrorModal';

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();

    // const userData = useContext(UserContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);
    // const [userState, setUserState] = useState<User>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);


        const userEmail = email;
        const userPassword = password;

        if (!userEmail || !userPassword) return;

        setIsLoading(true);

        try {

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
                localStorage.setItem('userId', user.userId);
            }

            if (isSuccess) {
                setIsLoading(false);
                navigate('/expenses');
                localStorage.setItem('token', token);
            }

            else throw new Error(message);
        }
        catch (err: any) {
            setIsLoading(false);
            setError("Failed to verify Login Credentials due to Server Error, our team is working on it. Please try again later.");
        }
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
        <>
            <Modal isOpen={isLoading} style={`px-24`}>
                <div className='text-center mb-4 font-bold text-lg'>Authenticating</div>
                <Spinner />
            </Modal>
            <ErrorModal onClose={() => setError('')} message={error} />
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
                                error={submitted && !email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                helperText={submitted && !email ? `Please enter your email address` : ''}
                            />
                            <TextField
                                error={submitted && !password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                helperText={submitted && !password ? `Please enter your password` : ''}
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
        </>
    );
}