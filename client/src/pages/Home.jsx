import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggedIn } from "../../redux/loggedSlice";
import '../styles/home.css'

const Home = () => {
    const logged = useSelector((state) => state.logged);
    const dispatch = useDispatch();
    function handleLogout() {
        localStorage.clear();
        dispatch(loggedIn(localStorage.getItem("token")));
    }

    return (
        <div>
            <nav className="nav-home">
                <div className="nav-home-first">
                    <p>logo</p>


                </div>
                <div className="nav-home-second">
                    {logged && <Link to={"/dash"}>Dashboard</Link>}
                    {!logged && <Link to="/auth">Login</Link>}
                    {!logged && <Link to="/auth">Register</Link>}
                    {logged && <Link onClick={handleLogout}>Logout</Link>}
                </div>
            </nav>
        </div>
    );
};

export default Home;


