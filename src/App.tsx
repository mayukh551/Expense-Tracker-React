import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./Components/Auth/SignUp";
import LogIn from "./Components/Auth/LogIn";
import Home from "./Components/Expenses/Home";
import Profile from "./Components/Profile/Profile";
import Account from "./Components/Account/Account";
import UserDetails from "./Components/Auth/UserDetails";
import ProductPage from "./Components/Home/Home";
import YearlyCategoryExpenseChart from "./Components/Profile/Chart/MonthlyExpensePieChart";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import "./styles/theme.css";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="user_details" element={<UserDetails />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="expenses" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="account" element={<Account />} />
                    <Route path="statistics" element={<YearlyCategoryExpenseChart/>} />
                </Routes >
            </BrowserRouter >
        </ThemeProvider>
    );
}

export default App;