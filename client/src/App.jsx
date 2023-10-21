import { Navigate, Route, Routes } from "react-router-dom";

import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostForm from "./components/PostForm";
import EditPost from "./components/EditPost";
import EditComment from "./components/EditComment";
import AddComment from "./components/AddComment";
import Search from "./pages/Search";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import OtherProfiles from "./pages/OtherProfiles";
import FriendPosts from "./components/FriendPosts";
import Chats from "./pages/Chats";
import EditProfile from "./pages/EditProfile";
import BigBox from "./pages/BigBox";



const App = () => {

    const token = localStorage.getItem("token");

    return (
        <div className="app">
            <Home />
            <Routes>
                <Route
                    path="/"
                    exact
                    element={token ? <BigBox /> : <Navigate to="/auth" />}
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
                    element={token ? <BigBox /> : <Navigate to="/auth" />}
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
                />   <Route
                    path="/search"
                    element={token ? <Search /> : <Navigate to="auth" />}
                />
                <Route
                    path="/friends"
                    element={token ? <Friends /> : <Navigate to="auth" />}
                />
                <Route
                    path="/profile"
                    element={token ? <Profile /> : <Navigate to="auth" />}
                />
                <Route
                    //this is used in list of users in the dash/feed 
                    path="/profile/:username"
                    element={token ? <OtherProfiles /> : <Navigate to="auth" />}
                />
                <Route
                    //this is used when a user goes to another user profile and clicks on their post
                    path="/friendPost/:postId"
                    element={token ? <FriendPosts /> : <Navigate to="auth" />}
                />
                <Route
                    path="/chats"
                    element={token ? <Chats /> : <Navigate to="auth" />}
                />
                <Route
                    path="/edit/profile"
                    element={token ? <EditProfile /> : <Navigate to="auth" />}
                />

                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>
    );
};

export default App;
