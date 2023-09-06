import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import your custom CSS here
import logo from "../images/logo.png";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.clear();
        navigate("/auth");
        window.location.reload();
    }

    return (
        <div>
            <nav className="home-nav">
                <div className="home-first-nav">
                    <img src={logo} width={150} alt="Logo" className="home-logo" />

                    {token && (
                        <Link to={"/search"} className="home-link">
                            Search
                        </Link>
                    )}
                </div>

                {token && (
                    <div className="home-nav-small">
                        <Link to={"/dash"} className="home-link">
                            Feed
                        </Link>
                        <Link to={"/friends"} className="home-link">
                            Friends
                        </Link>
                        <Link to={"/chats"} className="home-link">
                            Chats
                        </Link>
                        <Link to={"/profile"} className="home-link">
                            Profile
                        </Link>
                        <Link onClick={handleLogout} className="home-link">
                            Logout
                        </Link>
                    </div>
                )}


            </nav>
        </div>
    );
};

export default Home;
