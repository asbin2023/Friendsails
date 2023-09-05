import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        getPosts();
    }, []);

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
        <div>
            <div className=" p-10 pt-10">
                {posts.map((item) => {
                    const createdAt = new Date(item.createdAt);
                    const newData = createdAt.toLocaleDateString();
                    const newTime = createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    return (
                        <div
                            className="border-2 mt-7 p-2 cursor-pointer bg-slate-100"
                            onClick={() => toEdit(item._id)}
                            key={item._id}
                        >
                            <div className="flex w-2/5 justify-between">
                                <h1 className="font-bold">{item.title} <span>{item.edited && '(edited)'}</span></h1>
                                <div className="flex">
                                    <button
                                        onClick={(e) => deletePost(item._id, e)}
                                        className="bg-red-200 p-1 text-white"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={(e) => sendToEdit(item._id, e)}
                                        className=" ml-1 p-1 text-white bg-blue-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            {item.image && (
                                <img className="p-2" src={item.image} width={400} />
                            )}
                            <p className="p-2">{item.body}</p>
                            <p>{item.comments.length} Comments</p>

                            <h1 className=" border-2 p-1 bg-orange-200">
                                posted by: {item.author === localStorage.getItem('username') ? 'You' : item.author} on {newTime} at {newData}
                            </h1>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <div className="p-3">
            <p>You currently have no posts!</p>

        </div>
    );
};

export default ShowPosts;
