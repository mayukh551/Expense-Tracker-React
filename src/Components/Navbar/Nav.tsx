import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import classes from './Nav.module.css';

const Nav: React.FC = () => {
    const navigate = useNavigate();

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
                <Button
                    variant="outlined"
                    size='medium'
                    sx={{ color: '#FFFFFF' }}
                    onClick={handleLogOut}>
                    Logout
                </Button>
            </Container>
        </div>
    )
}

export default Nav;