import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./Components/Auth/SignUp";
import LogIn from "./Components/Auth/LogIn";
import Home from "./Components/Expenses/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="login" element={<LogIn />} />
                <Route path="expenses" element={<Home />} />
            </Routes >
        </BrowserRouter >
    );
}

export default App;
