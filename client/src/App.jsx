import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dash from "./pages/Dash";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostForm from "./components/PostForm";
import EditPost from "./components/EditPost";
import EditComment from "./components/EditComment";
import AddComment from "./components/AddComment";

const App = () => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    return (
        <div>
            <Home />
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
                <Route
                    path="/post/edit/:postId"
                    element={token ? <EditPost /> : <Navigate to="/auth" />}
                />

                <Route
                    path="/addComment/:postId"
                    element={token ? <AddComment /> : <Navigate to="auth" />}
                />
                <Route
                    path="/editComment/:postId/:commentId"
                    element={token ? <EditComment /> : <Navigate to="auth" />}
                />

                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>
    );
};

export default App;
