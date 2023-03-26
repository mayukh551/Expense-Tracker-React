import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./Components/Auth/SignUp";
import LogIn from "./Components/Auth/LogIn";
import Home from "./Components/Expenses/Home";
import Profile from "./Components/Profile/Profile";
import { CookiesProvider } from 'react-cookie';

function App() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="expenses" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                </Routes >
            </BrowserRouter >
        </CookiesProvider>
    );
}

export default App;
