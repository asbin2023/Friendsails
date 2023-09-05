import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    function handleLogout() {
        localStorage.clear();
        navigate('/auth')
        window.location.reload()

    }

    return (
        <div>
            <nav className="flex justify-around bg-gray-200 p-3 gap-60">
                <div className="flex gap-5">
                    <p>logo</p>
                    <h1>Placeholder</h1>
                    {token && <Link to={'/search'}>Search</Link>}
                </div>
                <div className="flex gap-10">
                    {token && (
                        <>
                            <Link to={"/dash"}>Feed</Link>
                            <Link to={"/friends"}>Friends</Link>
                            <Link to={"/#"}>Chats</Link>
                            <Link to={"/#"}>Alerts</Link>
                            <Link onClick={handleLogout}>Logout</Link>
                        </>
                    )}

                    {!token && (
                        <>
                            <Link to="/auth">Login</Link>
                            <Link to="/auth">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Home;
