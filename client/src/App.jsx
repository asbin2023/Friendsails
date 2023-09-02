import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dash from "./pages/Dash";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostForm from "./pages/PostForm";

const myPath = ["/", "/dash", "/auth", "/new"];

const App = () => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    return (
        <div>
            {myPath.includes(location.pathname) && <Home />}
            <Routes>
                <Route
                    path="/"
                    exact
                    element={token ? <Dash /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/new"
                    element={token ? <PostForm /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={!token ? <Auth /> : <Navigate to="/dash" />}
                />
                <Route
                    path="/dash"
                    element={token ? <Dash /> : <Navigate to="/auth" />}
                />
                {!myPath.includes(location.pathname) && (
                    <Route path="*" element={<Notfound />} />
                )}
            </Routes>
        </div>
    );
};

export default App;
