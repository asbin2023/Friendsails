import { Link, useNavigate } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/dash.css";

const Dash = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState("");

    useEffect(() => {
        async function getAllUsers() {
            try {
                const users = await axios.get("/api/user/allUsers", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setAllUsers(users.data.users);
            } catch (err) {
                console.log(err);
            }
        }
        getAllUsers();
    }, []);

    return (
        <div className="dash-main-div">
            <div className="dash-users">
                <Link to={"/new"}>
                    Make a post
                </Link>
                <h1>List of users:</h1>
                {allUsers &&
                    allUsers.map((user) => {
                        if (user.username !== localStorage.getItem("username"))
                            return (
                                <div className="dash-user-inside" key={user._id}>
                                    <button onClick={() => navigate(`/profile/${user.username}`)}>
                                        {" "}
                                        {user.username}
                                    </button>
                                </div>
                            );
                    })}
            </div>
            <div className="dash-show-main">

                <ShowPosts />
            </div>
        </div>
    );
};

export default Dash;
