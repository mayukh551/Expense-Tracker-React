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

        var status: number = 500;

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

            status = response.status;

            console.log({
                isSuccess,
                token,
                user
            });

            if (user) {
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('budget', JSON.stringify(user.budget));
                localStorage.setItem('category', JSON.stringify(user.category));
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

            if (status >= 400)
                setError("Invalid Username or Password");

            else
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
            <div className="bg-[#b887f5] h-screen w-screen top-0 my-0 flex items-center bg-gradient-to-tr from-[#b887f5] to-[#ffffff]"  >
                <Modal isOpen={isLoading} style={`px-24`}>
                    <div className='text-center mb-4 font-bold text-lg'>Authenticating</div>
                    <Spinner />
                </Modal>
                <ErrorModal onClose={() => setError('')} message={error} />
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <Box
                            sx={{
                                width: ['310px', '480px'],
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                alignItems: 'center',
                                py: 4,
                                margin: 'auto',
                                // px:5,
                                boxShadow: 10,
                                borderRadius: '20px'

                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: [2, 5] }}>
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
                                    sx={{ mt: 3, mb: 2, backgroundColor: '#b887f5', "&:hover": { backgroundColor: "#894cd4" } }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Link href="#" variant="body2" sx={{ fontSize: ['12px', '14px'] }}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Link sx={{ fontSize: ['12px', '14px'], cursor: 'pointer', display: 'block', mt: [1, 0] }} onClick={() => navigate('/signup')} variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </>
    );
}