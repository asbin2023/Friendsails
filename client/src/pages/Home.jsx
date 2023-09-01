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
            <nav className="flex justify-around bg-gray-200 p-3 gap-60">
                <div className="flex gap-5">
                    <p>logo</p>
                    <h1>Placeholder</h1>
                    {logged && <Link >Search</Link>}
                </div>
                <div className="flex gap-10">
                    {logged && <>
                        <Link to={"/dash"}>Feed</Link>
                        <Link to={"#"}>Friends</Link>
                        <Link to={"/#"}>Chats</Link>
                        <Link to={"/#"}>Alerts</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </>}

                    {!logged && <>
                        <Link to="/auth">Login</Link>
                        <Link to="/auth">Register</Link>

                    </>}

                </div>
            </nav>
        </div>
    );
};

export default Home;


