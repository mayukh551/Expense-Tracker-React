import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classes from './Nav.module.css';
import { lightBlue } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Nav: React.FC<{ hasProfile?: boolean | null }> = (props) => {
    const navigate = useNavigate();

    const backHome = (): void => {
        navigate('/expenses');
    }

    const handleLogOut = (): void => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
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
                        <div style={{ color: 'white' }}>
                            Expense Tracker
                        </div>
                    )}
                    <div className={`${classes.profile_control}`}>
                        <Link to='/profile'>
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