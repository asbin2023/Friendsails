import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../redux/loggedSlice";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dash from "./pages/Dash";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

// command option i for inspect shortcut!

// if (location != '/' || location != '/login' || location != '/signup' || location != '/dash') {
//     navigate('/')
// }

const myPath = ['/', '/dash', '/auth']

const App = () => {
    const location = useLocation()
    console.log(location.pathname, 'thats hty epath name')
    console.log(typeof location.pathname)
    const logged = useSelector((state) => state.logged);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loggedIn(token));
    }, [logged]);

    return (
        <div>

            {myPath.includes(location.pathname) && <Home />}
            <Routes>
                <Route path="/" element={logged ? <Dash /> : <Navigate to='/auth' />} />

                <Route
                    path="/auth"
                    element={!logged ? <Auth /> : <Navigate to="/dash" />}
                />
                <Route
                    path="/dash"
                    element={logged ? <Dash /> : <Navigate to="/auth" />}
                />
                {!myPath.includes(location.pathname) && <Route path="*" element={<Notfound />} />}
            </Routes>
        </div>
    );
};

export default App;
