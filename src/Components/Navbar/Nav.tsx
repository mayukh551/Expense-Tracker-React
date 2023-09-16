import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classes from './Nav.module.css';
import { lightBlue } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const Nav: React.FC<{ hasProfile?: boolean | null }> = (props) => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const backHome = (): void => {
        navigate('/expenses');
    }

    const handleLogOut = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('month');
        localStorage.removeItem('year');
        localStorage.removeItem('userId');
        localStorage.removeItem('budget');
        navigate('/');
    }

    return (
        <div className='sticky z-50 w-full'>
            <Container maxWidth='xl'
                sx={{ textAlign: 'right' }}
                className={`${classes.nav}`}
            >
                <div className={`${classes.tabs}`}>

                    {/* Conditional Back to home btn */}
                    {props.hasProfile ? (
                        <div
                            onClick={() => backHome()}
                            className={`${classes['back-to-home-btn']}`}>
                            <ArrowBackIcon sx={{ marginRight: 1 }} />
                            <div>Back</div>
                        </div>
                    ) : (
                        <div style={{ color: 'white' }} className='font-extrabold text-2xl'>
                            CoinWise
                        </div>
                    )}
                    <div className={`${classes.profile_control}`}>
                        <Link to='/profile'>
                            <InsertChartIcon sx={{
                                color: lightBlue[50],
                                fontSize: 40,
                                marginRight: 2,
                                cursor: 'pointer'
                            }} />
                        </Link>
                        <Link to='/account'>
                            <AccountCircleIcon sx={{
                                color: lightBlue[50],
                                fontSize: 40,
                                marginRight: 2,
                                cursor: 'pointer'
                            }} />
                        </Link>
                        <Button
                            variant="contained"
                            size='medium'
                            sx={{ color: '#FFFFFF' }}
                            onClick={handleLogOut}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default Nav;