import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import defUser from "../images/default.jpg";

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await axios.get(
                    `/api/user/profile/${localStorage.getItem("username")}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                setProfile(res.data.userProfile);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();
        getPosts();
    }, []);

    async function getPosts() {
        let token = localStorage.getItem("token");
        try {
            const posts = await axios.get("/api/user/posts", {
                headers: {
                    Authorization: token,
                },
            });
            setPosts(posts.data.posts);
        } catch (err) {
            console.log(err);
        }
    }



    function sendToEdit(id, e) {
        e.stopPropagation();
        navigate(`/post/edit/${id}`);
    }

    async function deletePost(postId, e) {
        e.stopPropagation();
        let token = localStorage.getItem("token");
        try {
            await axios.delete(`/api/user/posts/${postId}`, {
                headers: {
                    Authorization: token,
                },
            });
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }
    function toEdit(id) {
        navigate(`/addComment/${id}`);
    }


    return posts.length > 0 ? (
        <div className="showposts-main-div">

            {posts.map((item) => {
                const createdAt = new Date(item.createdAt);
                const newDate = createdAt.toLocaleDateString();
                const newTime = createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return (
                    <div
                        className="showposts-map-div"
                        onClick={() => toEdit(item._id)}
                        key={item._id}
                    >
                        <div className="showposts-okay1">
                            <img
                                src={profile ? profile.picture : defUser}
                                alt=""
                                height={48}
                                width={48}
                            />
                            <div className="showposts-okay2">

                                <p id="showposts-name">{profile ? profile.name : '@' + item.author}</p>
                                <p>{profile && '@' + item.author}</p>
                                <p>{newDate}</p>
                            </div>

                            <button className="showposts-delete" onClick={(e) => deletePost(item._id, e)}>
                                Delete
                            </button>
                            <button className="showposts-edit" onClick={(e) => sendToEdit(item._id, e)}>Edit</button>

                        </div>
                        <div className="showposts-content">
                            <h1>
                                {item.title} <span className="showposts-edited-title">{item.edited && "(edited)"}</span>
                            </h1>

                            {item.image && (
                                <img
                                    className="showposts-image"
                                    src={item.image}
                                    width={400}
                                />
                            )}
                            <p>{item.body}</p>
                        </div>

                        <p className="showposts-comment">{item.comments.length} Comments</p>

                    </div>
                );
            })}

        </div>
    ) : (
        <div className="">
            <p>You currently have no posts!</p>
        </div>
    );
};

export default ShowPosts;
