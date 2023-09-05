import { Link, useNavigate } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";
import axios from "axios";
import { useEffect, useState } from "react";

const Dash = () => {
    const [allUsers, setAllUsers] = useState("");
    console.log(allUsers);
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
        <div>
            <div className="p-10">
                <Link to={"/new"}>
                    <button className="p-2 bg-green-700 text-white">Make a post</button>
                </Link>
                <ShowPosts />
            </div>
            <div className="p-10 m-5">
                <h1 className="underline">List of users:</h1>
                {allUsers && allUsers.map((user) => {
                    if (user.username !== localStorage.getItem('username'))
                        return (
                            <div key={user._id}>
                                <h1>{user.username} --> <span className="p-1 text-white bg-cyan-700">Profile</span></h1>

                            </div>
                        );
                })}
            </div>
        </div>
    );
};

export default Dash;
