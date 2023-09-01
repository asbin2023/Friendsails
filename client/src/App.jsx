import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../redux/loggedSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";

// command option i for inspect shortcut!

// if (location != '/' || location != '/login' || location != '/signup' || location != '/dash') {
//     navigate('/')
// }

const App = () => {
    const logged = useSelector((state) => state.logged);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loggedIn(token));
    }, [logged]);

    return (
        <div>
            <h1>hi</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={!logged ? <Login /> : <Navigate to="/dash" />}
                />
                <Route
                    path="/signup"
                    element={!logged ? <Signup /> : <Navigate to="/dash" />}
                />
                <Route
                    path="/dash"
                    element={logged ? <Dash /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>
    );
};

export default App;
